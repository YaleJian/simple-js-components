import stools from "simple-js-tools"

//HTMLElement扩展方法
class HTMLElementExtends extends HTMLElement {
    childNodes;//真实的元素

    static get observedAttributes() {
        return [
            "disabled",
        ];
    }

    //构造函数
    constructor() {
        super();
        // const shadowRoot = this.attachShadow({mode: "open"});
        // this.element = this.shadowRoot.childNodes
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // console.log("attributeChangedCallback",name, oldValue, newValue)
    }

    syncChild = true //是否同步属性变更到子元素

    toggleDisabled(callback) {

        //开启同步属性到子元素
        this.syncChild = true

        if (callback) callback.isHook = true
        this.toggleAttribute("disabled", callback)
    }

}

let func = {
    init: () => {

        //布尔值属性的状态（如果属性不存在则添加属性，属性存在则移除属性）
        func.hooks("toggleAttribute")

        // 同步自定义元素属性到shadowRoot元素
        func.syncHook()

    },

    //劫持HTMLElement所有方法
    hooks(functionName, callback) {
        if (!HTMLElementExtends.prototype[functionName].hooked) {
            const raw_func = HTMLElementExtends.prototype[functionName]
            // if(functionName === "setAttribute") console.log(raw_func,1)
            HTMLElementExtends.prototype[functionName] = function (...args) {
                let lastParam = (args && args.length > 0) ? args[args.length - 1] : false
                if (lastParam && stools.compare.isFunction(lastParam) && lastParam.isHook) callback = lastParam
                if (callback && stools.compare.isFunction(callback) && callback.isHook) {
                    callback(arguments, this).then(res => {
                        arguments[args.length - 1] = undefined
                        // console.log("[HTMLElement hooks]", functionName, args)
                        return raw_func.apply(this, arguments)
                    })
                } else {
                    console.log("[HTMLElement]", functionName, args)
                    return raw_func.apply(this, arguments)
                }
            }

            HTMLElementExtends.prototype[functionName].hooked = true
        }
    },

    syncHook(callback) {
        if (!callback) {
            callback = (args, _this) => {
                const name = args[0], oldValue = args[1], newValue = args[2]
                return new Promise((resolve, reject) => {
                    // console.log("attributeChangedCallback Hook!!", args, _this.syncChild, _this)
                    func.syncAttr(_this, name, oldValue, newValue)
                    resolve()
                })
            }
        }
        callback.isHook = true
        func.hooks("attributeChangedCallback", callback)
    },

    syncAttr(_this, name, oldValue, newValue) {
        if (_this.shadowRoot.childNodes.length > 0 && _this.syncChild) {
            const el = _this.shadowRoot.childNodes[0]
            if (oldValue && newValue) {
                el[name] = newValue
            } else {
                el.toggleAttribute(name)
            }
            console.log("[HTMLElement syncAttr]", name, oldValue, newValue)
        }
    }
}
export default {
    Extends: HTMLElementExtends,
    ...func
}
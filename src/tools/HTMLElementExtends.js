import stools from "simple-js-tools"

//HTMLElement扩展方法
class HTMLElementExtends extends HTMLElement {
    childNodes;//真实的元素
    //构造函数

    static get observedAttributes() {
        return [
            "disabled",
        ];
    }

    constructor() {
        super();
        // const shadowRoot = this.attachShadow({mode: "open"});
        // this.element = this.shadowRoot.childNodes


        //同步自定义元素属性到shadowRoot元素
        func.syncAttr(this)

    }


    attributeChangedCallback(name, oldValue, newValue) {
        console.log("attributeChangedCallback", 1, name, oldValue, newValue)
        func.syncAttr(this)
    }

    disabled //禁用toggle方法
    syncAttr //是否同步属性变更到子元素

    toggleDisabled(callback) {
        if (callback) callback.isCallback = true
        this.disabled = this.toggleAttribute("disabled", callback)
    }


}

let func = {
    init: () => {

        //布尔值属性的状态（如果属性不存在则添加属性，属性存在则移除属性）
        func.hooks("toggleAttribute")
        // func.syncAttr()
        func.syncHook()

    },

    //劫持HTMLElement所有方法
    hooks(functionName, callback) {
        if (!HTMLElementExtends.prototype[functionName].hooked) {
            const raw_func = HTMLElementExtends.prototype[functionName]

            HTMLElementExtends.prototype[functionName] = function (...args) {
                let lastParam = (args && args.length > 0) ? args[args.length - 1] : false
                if (lastParam && stools.compare.isFunction(lastParam) && lastParam.isCallback) callback = lastParam
                if (callback && stools.compare.isFunction(callback) && callback.isCallback) {
                    callback(arguments, this).then(res => {
                        arguments[args.length - 1] = undefined
                        console.log("[HTMLElement hooks]", functionName, args)
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

    syncAttr(_this) {
        if (_this) {
            _this.addEventListener("attributeChangedCallback", (name, oldValue, newValue) => {
                console.log("attributeChangedCallback Listener")
                if (_this.childNodes.length > 0) {
                    const el = _this.childNodes[0]
                    el[name] = newValue
                    console.log("[HTMLElement syncAttr]", name, oldValue, newValue)
                }
            }, false)
        }
    },

    syncHook(callback) {
        if (!callback) {
            callback = (args, _this) => {
                const name = args[0], oldValue = args[1], newValue = args[2]
                return new Promise((resolve, reject) => {
                    console.log("attributeChangedCallback Hook!!", args, _this)
                    if (_this.shadowRoot.childNodes.length > 0) {
                        const el = _this.shadowRoot.childNodes[0]
                        if (oldValue && newValue) {
                            el[name] = newValue
                        } else {
                            el.toggleAttribute(name)
                        }
                        console.log("[HTMLElement syncAttr]", name, oldValue, newValue)
                    }
                    resolve()
                })
            }
        }
        callback.isCallback = true
        func.hooks("attributeChangedCallback", callback)
    }
}
export default {
    Extends: HTMLElementExtends,
    ...func
}
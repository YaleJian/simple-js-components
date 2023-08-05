import stools from "simple-js-tools"

class Extend extends HTMLElement {
    //是否同步属性变更到子元素
    get syncChild() {
        return this.getAttribute("syncChild") || true
    }

    set syncChild(value) {
        if (value === false) this.setAttribute("syncChild", value);
    }
}

//Element工具方法
let element = {
    init: (classObj) => {

        //布尔值属性的状态（如果属性不存在则添加属性，属性存在则移除属性）
        element.hooks("toggleAttribute", false, classObj)

        // 同步自定义元素属性到shadowRoot元素
        element.syncHook(false, classObj)

    },
    HTMLElement: Extend,

    //劫持HTMLElement所有方法
    hooks(functionName, callback, classObj) {
        const raw_func = classObj.prototype[functionName]
        if (raw_func && !raw_func.hooked) {
            classObj.prototype[functionName] = function (...args) {
                let lastParam = (args && args.length > 0) ? args[args.length - 1] : false
                if (lastParam && stools.compare.isFunction(lastParam) && lastParam.isHook) callback = lastParam
                if (callback && stools.compare.isFunction(callback) && callback.isHook) {
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

            classObj.prototype[functionName].hooked = true
        }
    },

    syncHook(callback, classObj) {
        if (!callback) {
            callback = (args, _this) => {

                return new Promise((resolve, reject) => {
                    if (_this.syncChild === true || _this.syncChild === 'true') {
                        element.syncAttr(_this, args)
                    }
                    resolve()
                })
            }
            callback.isHook = true
        }

        element.hooks("attributeChangedCallback", callback, classObj)
    },

    syncAttr(_this, args) {
        const name = args[0], oldValue = args[1], newValue = args[2]
        if (_this.shadowRoot.childNodes.length > 0) {
            const el = _this.shadowRoot.childNodes[0]
            if (newValue) {
                console.log(name, newValue, args)
                el.setAttribute(name, newValue)
            } else {
                el.toggleAttribute(name)
            }
            console.log("[HTMLElement syncAttr]", name, oldValue, newValue)
        }
    }
}
export default element
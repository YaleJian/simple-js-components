import stools from "simple-js-tools"

//HTMLElement扩展方法
class HTMLElementExtends extends HTMLElement {

    //构造函数
    constructor() {
        super();
    }

    //禁用toggle方法
    disabled

    toggleDisabled(callback) {
        if (callback) callback.prototype.callback = true
        this.disabled = this.toggleAttribute("disabled", callback)
    }

}

let func = {
    init: () => {

        //布尔值属性的状态（如果属性不存在则添加属性，属性存在则移除属性）
        func.hooks("toggleAttribute")
    },

    //劫持HTMLElement所有方法
    hooks(functionName, callback) {
        if (!HTMLElementExtends.prototype[functionName].hooked) {
            const raw_func = HTMLElementExtends.prototype[functionName]

            HTMLElementExtends.prototype[functionName] = function (...args) {
                let lastParam = args[args.length]
                if (lastParam && stools.compare.isPromise(lastParam) && lastParam.prototype.callback) callback = lastParam
                if (callback && stools.compare.isPromise(callback) && callback.prototype.callback) {
                    callback(arguments).then(res => {
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
    }
}
export default {
    Extends: HTMLElementExtends,
    ...func
}
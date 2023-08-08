import stools from "simple-js-tools"

class Extend extends HTMLElement {
    //是否同步属性变更到子元素
    get sync() {
        return this.getAttribute("sync") || true
    }

    set sync(value) {
        if (value === false) this.setAttribute("sync", value);
    }

    get name() {
        return this.getAttribute("name")
    }

    set name(value) {
        this.setAttribute("name", value);
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
                    if (_this.sync === true || _this.sync === 'true') {
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
            let childNodes = _this.shadowRoot.childNodes
            for (let i = 0; i < childNodes.length; i++) {
                let el = childNodes[0]
                if (newValue) {
                    el.setAttribute(name, newValue)
                } else {
                    el.toggleAttribute(name)
                }
            }
            console.log("[HTMLElement syncAttr]", name, oldValue, newValue)
        }
    },
    loadFont(family, source, descriptors){

        //默认字体
        /*if(!family) family = "iconfont"
        if(!source) source = [
            "url('/simple-web-components/font/iconfont.woff2?t=1691462778950') format('woff2')",
            "url('/simple-web-components/font/iconfont.woff?t=1691462778950') format('woff')",
            "url('/simple-web-components/font/iconfont.ttf?t=1691462778950') format('truetype')"
        ]
        if(!descriptors) descriptors = {
            style: "normal",
            weight: "400",
            stretch: "condensed",
        }

        const font = new FontFace(family, source, descriptors)
        // wait for font to be loaded
        font.load().then((fontFace)=>{
            // add font to document
            document.fonts.add(font);
            // enable font with CSS class
            document.body.classList.add("fonts-loaded");
        });

        const css = '.iconfont { font-family: "iconfont" !important; font-size: 42px; }';
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(css);
        document.adoptedStyleSheets = [sheet];*/

        let head = document.getElementsByTagName('head')[0];
        let link = document.createElement('link');
        link.type='text/css';
        link.rel = 'stylesheet';
        link.href = "/simple-web-components/font/iconfont.css";
        head.appendChild(link);

        let script = document.createElement('script');
        script.src = "/simple-web-components/font/iconfont.js";
        head.appendChild(script);

        console.log("loadFont")
    }
}
export default element
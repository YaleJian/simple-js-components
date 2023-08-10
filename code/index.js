import element from "./tools/element";
import Button from "./element/button/button.js";
import Icon from "./component/icon/icon.js";

let components = {
    "button": {
        constructor: Button,
        isHTMLTag: true
    },
    "icon": {
        constructor: Icon
    },
}
for (let i in components) {
    if (components.hasOwnProperty(i)) {
        element.init(components[i].constructor)

        if (!customElements.get("s-" + i)) {
            console.log("s-" + i)

            if (components[i].isHTMLTag) {
                customElements.define("s-" + i, components[i].constructor, {
                    extends: i
                });
            } else {
                customElements.define("s-" + i, components[i].constructor)
            }
        }
    }
}

//加载默认字体
element.loadFont()

export {
    Button,
    Icon
}
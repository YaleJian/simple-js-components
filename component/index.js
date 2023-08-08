import element from "./tools/element";
import Button from "./button/button.js";
import Icon from "./icon/icon.js";

let components = {
    "button": Button,
    "icon": Icon,
}
for (let i in components){
    if(components.hasOwnProperty(i)){
        element.init(components[i])

        if (!customElements.get("s-"+i)) {
            console.log("s-"+i)
            customElements.define("s-"+i, components[i]);
        }
    }
}

//加载默认字体
element.loadFont()

export {
    Button,
    Icon
}
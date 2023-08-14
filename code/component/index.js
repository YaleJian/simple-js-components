import element from "./../tools/element";
import icon from "./icon/icon.js";

let components = {
    "icon": icon
}
for (let i in components) {
    if (components.hasOwnProperty(i)) {
        element.init(components[i])

        if (!customElements.get("s-" + i)) {
            customElements.define("s-" + i, components[i])
        }
    }
}

export default {
    icon
}
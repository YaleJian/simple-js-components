import element from "./../tools/element";
import icon from "./icon/icon.js";
import dialog from "../element/dialog/dialog";
import popup from "../element/popup/popup";

let components = {
    "icon": icon,
    "dialog": dialog,
    "popup": popup

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
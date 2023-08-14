import button from "./button/button";
import element from "../tools/element";

let components = {
    "button": button
}

for (let i in components) {
    if (components.hasOwnProperty(i)) {
        element.init(components[i])

        if (!customElements.get("s-" + i)) {
            customElements.define("s-" + i, components[i], {
                extends: i
            });
        }
    }
}
export default {
    button
}
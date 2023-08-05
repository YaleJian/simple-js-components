import element from "../tools/element.js";
import Base from "../Base";

export default class Button extends Base {
    element;//真实的元素


    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: "open"})
        shadowRoot.innerHTML = `<button class="button" part="button" id="button">
                                    <slot></slot>
                                </button>`;
        this.element = shadowRoot.getElementById("button");

    }

    static get observedAttributes() {
        return [
            "disabled",
            "size",
        ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
    }

}

element.init(Button)

if (!customElements.get("s-button")) {
    customElements.define("s-button", Button);
}

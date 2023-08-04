import HTMLElementExtends from "../tools/HTMLElementExtends.js";

HTMLElementExtends.init()
export default class Button extends HTMLElementExtends.Extends {
    element;//真实的元素


    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: "open"})
        shadowRoot.innerHTML = `<button class="button" customTag="button" id="button">
                                    <slot></slot>
                                </button>`;
        this.element = shadowRoot.getElementById("button");
    }

    focus(options) {
        this.element.focus(options);
    }

}

if (!customElements.get("s-button")) {
    customElements.define("s-button", Button);
}

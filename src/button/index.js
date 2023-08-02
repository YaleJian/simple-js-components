import HTMLElementExtends from "../tools/HTMLElementExtends.js";

HTMLElementExtends.init()
export default class Button extends HTMLElementExtends.Extends {
    #btnEl;

    static get observedAttributes() {
        return [
            "disabled",
        ];
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: "open"});
        shadowRoot.innerHTML = `<button
            class="button" part="button" id="button"
          >
          <slot></slot>
          </button>
          `;
        this.#btnEl = shadowRoot.getElementById("button");
    }

    focus(options) {
        this.#btnEl.focus(options);
    }


    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "disabled") {
            this.#btnEl.toggleAttribute("inert", newValue !== null);
            this.#btnEl.toggleAttribute("disabled", newValue !== null);
            return;
        }

        this.#btnEl[name] = newValue;
    }
}

if (!customElements.get("s-button")) {
    customElements.define("s-button", Button);
}

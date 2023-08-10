import Base from "../../Base.js";
import element from "../../tools/element";

/**
 * 图标
 */
export default class Icon extends Base {
    element;

    constructor(fontFace) {
        super();
        const shadowRoot = this.attachShadow({mode: "open"})
        shadowRoot.innerHTML = `<div class="icon iconfont" part="icon" id="icon">
                                    <slot></slot>
                                </div>`;
        const wrapper = document.createElement('span');
        wrapper.setAttribute('class', 'icon');
        this.element = shadowRoot.getElementById("icon");
    }

    static get observedAttributes() {
        return [
            "disabled",
            "size",
            "name",
        ];
    }

    get type() {
        return this.getAttribute("type")
    }

    set type(value) {
        this.setAttribute("type", value)
    }

    get name() {
        this.getAttribute("name")
    }

    set name(value) {
        this.setAttribute("name", value);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (['name'].includes(name)) {
            let svg = document.createElement('svg')
            svg.setAttribute("class", "icon")
            svg.setAttribute("aria-hidden", "true")
            let use = document.createElement('use')
            use.setAttribute("href", `#icon-${newValue}`)
            svg.append(use)
            this.removeChild("shadowRoot")
            this.prepend(svg)
        }
    }
}
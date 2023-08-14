import Base from "../../Base.js";

export default class Button extends HTMLButtonElement {


    constructor() {
        super();
        this.render();

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

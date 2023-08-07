import Base from "../Base";
/**
 * 图标
 */
export default class Icon extends Base {
    element;

    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: "open"})
        shadowRoot.innerHTML = `<div class="icon" part="icon" id="icon">
                                    <i class=""></i>
                                    <slot></slot>
                                </div>`;
        this.element = shadowRoot.getElementById("icon");

    }

    static get observedAttributes() {
        return [
            "disabled",
            "size",
            "name",
        ];
    }

    get type(){

    }
    set type(type){
        console.log(type)
    }

    get name(){
        this.getAttribute("name")
    }

    set name(value){
        console.log(value)
        this.setAttribute("name", value);
        this.element.getElementById("i").setAttribute("class",value)
    }

    attributeChangedCallback(name, oldValue, newValue) {
    }
}
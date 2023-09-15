import "./dialog.css"

class Dialog extends HTMLElement{
    constructor() {
        super();

    }
    connectedCallback(){
        this.innerHTML = `
        <div class="s dialog">
            <slot name="title"></slot>
            <slot></slot>
        </div>
        `
    }
}
export default Dialog
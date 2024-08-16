import "./tips.css"

class Tips extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        let styleSheet =  new CSSStyleSheet();
        styleSheet.replace(`
            :host .s.tips{
                position: absolute;
                filter: drop-shadow(2px 2px 15px rgba(0,0,0,.15));
                background: white;
                border-radius: var(--radius-2);
                margin: 6px 0
            }
        `)
        this.shadowRoot.adoptedStyleSheets = [...this.shadowRoot.adoptedStyleSheets, styleSheet];
        this.shadowRoot.innerHTML = `
        <div class="s tips">
            <slot></slot>
        </div>
        `
    }

    connectedCallback() {
    }
}

export default Tips
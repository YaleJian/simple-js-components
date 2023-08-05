import element from "./tools/element";

export default class Base extends element.HTMLElement {

    //构造函数
    constructor() {
        super();
    }

    get size() {
        return this.getAttribute("size");
    }

    set size(value) {
        this.setAttribute("size", value);
    }


    toggleDisabled(callback) {

        //开启同步属性到子元素
        this.syncChild = true

        if (callback) callback.isHook = true
        this.toggleAttribute("disabled", callback)
    }

}
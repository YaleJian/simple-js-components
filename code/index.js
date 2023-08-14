import element from "./tools/element";
import component from "./component";

let simpleWeb = Object.assign({}, element, component)

//加载默认字体
element.loadFont()

export default simpleWeb
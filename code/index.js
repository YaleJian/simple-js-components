import elementTools from "./tools/element";
import element from "./element";
import component from "./component";

let simpleWeb = Object.assign({}, element, component)

//加载默认字体
elementTools.loadFont()

export default simpleWeb
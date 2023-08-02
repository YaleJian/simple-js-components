# Simple Web Components
基于Web Component的 Headless组件，不含UI，只有组件逻辑，为了写UI组件库时能专注设计。

## 在vue中使用
[在 Vue 中使用自定义元素](https://cn.vuejs.org/guide/extras/web-components.html#using-custom-elements-in-vue)
## Vite 示例配置
```javascript
// vite.config.js
import vue from '@vitejs/plugin-vue'

export default {
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 将所有带短横线的标签名都视为自定义元素
          isCustomElement: (tag) => tag.includes('-')
        }
      }
    })
  ]
}
```
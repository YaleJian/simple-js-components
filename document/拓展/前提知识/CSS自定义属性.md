---
sidebar_position: 2
---

**自定义属性**（有时候也被称作**CSS 变量**或者**级联变量**）是由 CSS 作者定义的，它包含的值可以在整个文档中重复使用。由自定义属性标记设定值（比如： **`--main-color: black;`**），由 [var()](https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FCSS%2Fvar) 函数来获取值（比如： `color: var(--main-color);`）复杂的网站都会有大量的 CSS 代码，通常也会有许多重复的值.

#### 基本用法

声明一个自定义属性，属性名需要以两个减号（--）开始，属性值则可以是任何有效的 CSS 值。和其他属性一样，自定义属性也是写在规则集之内的,通常的最佳实践是定义在根伪类 [`:root`](https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FCSS%2F%3Aroot) 下，这样就可以在 HTML 文档的任何地方访问到它了：
，如下：



```css
:root {
  --main-bg-color: brown;
}
```

#### 案例



```html
 <div class="test1">1</div>
 <div class="test2">2</div>
 <div class="test3">3</div>
```



```css
:root {
  --test-bg: red;
}

.test1 {
  background-color: var(--test-bg);
}
.test2 {
  background-color: var(--test-bg);
}
.test3 {
  background-color: var(--test-bg);
}
```

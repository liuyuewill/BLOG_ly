### css

- 盒模型 content-box / border-box / padding-box / margin-box
- BFC：格式化上下文(IE: Layout，zoom:1触发)，是一个独立的渲染区域，让处于BFC内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响
  - 视觉格式化模型
    - 块盒(block)
    - 行内盒(inline)  
    - 匿名盒
  - 定位方案
    - 常规文档流
    - 浮动盒
    - 绝对定位 
  - 触发条件：
    - positon: absolute/fixed
    - display: inline-block/ table
    - 根元素
    - float
    - ovevflow不为visible
  - 规则：
    - 属于同一个BFC的两个相邻Box垂直排列
    - 属于同一个BFC的两个相邻Box的margin会发生重叠
    - BFC中子元素不会超出他的包含块
    - BFC的区域不会与float的元素区域重叠
    - 计算BFC的高度时，浮动子元素也参与计算
    - 文字层不会被浮动层覆盖，环绕于周围
  - 应用：
    - 阻止margin重叠
    - 可以包含浮动元素——清除内部浮动(清除浮动的原理是两个div都位于同一个BFC区域之中)
    - 自适应两栏布局
    - 可以阻止元素被浮动元素覆盖
- 层叠上下文：元素提升为一个比较特殊的图层，在三维空间中(z轴)高出普通元素一等
  - 根层叠上下文(html)
  - position
  - css3属性 
    - flex
    - transform
    - opacticy
    - filter
    - will-change
    - -webkit-overflow-scrolling	 
- 层叠等级：层叠上下文在z轴上的排序
  - 在同一层叠上下文中，层叠等级才有意义
  - z-index的优先级最高

<img width="600" src="./4.png">



- 居中
  - 水平居中： text-align / margin: 0 auto / absolute / justify-conten: center
  - 垂直居中：line-height / align-items: center / absolute / table
  - 水平垂直居中：
    - absolute
    - flex
- 选择器优先级： !important > 行内样式 > #id > .class > tag > * > 继承 > 默认 (从右往左解析)
- 清除浮动，防止高度塌陷
  - after / <br> : clear: both
  - 创建父级BFC
  - 父级设置高度
- 左侧固定，右侧自适应两栏布局
  - float / absolute + margin-left 
  - float + BFC
  - flex
  - calc
  - grid
- css三角形

```css
#item {
	width: 0;
	height: 0;
	border-left: 50px solid transparent;
	border-right: 50px solid transparent;
	border-top: 50px solid transparent;
	border-bottom: 50px solid blue;
	background: white;
}
```

- link 与 @import 的区别
  - link 功能较多，可以定义RSS，定义Rel等作用，而 @import 只能用于加载css
  - 当解析到link时，页面会同步加载所引的css，而@import所引用的css会等到页面加载完才被加载
  - @import 需要 IE5以上才能使用
  - link 可以使用 js动态引入，@import不行
- sass

### canvas

### svg

### 动画
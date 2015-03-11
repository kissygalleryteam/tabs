## 综述

Tabs。

![http://gtms02.alicdn.com/tps/i2/TB1DApgHXXXXXbOXXXXFvIM3VXX-434-180.png](http://gtms02.alicdn.com/tps/i2/TB1DApgHXXXXXbOXXXXFvIM3VXX-434-180.png)

## 初始化组件
	//皮肤文件建议直接拿源码的less文件根据自己业务定制化使用	
    S.use('kg/tabs/1.0.0/,kg/tabs/1.0.0/index.css', function (S, Tabs) {
        var tabs = new Tabs({
        	$target: '#J_Tab'
        });
    });

## API说明

### 属性

|名称|类型|默认值|描述|
|:---------------|:--------|:----|:----------|
|$target|String/NodeList|''|容器|
|event|String|`click`|响应的事件类型，可设置为`click`、`hover`，移动端自动设置为`tap`|
|effect|String|`none`|内容区域切换效果，可设置为`none`、`fade`、`slide`|
|effectSpeed|Number|500|内容区域切换效果的速度，单位为毫秒(ms)|
|delay|Number|可变|事件的延时，单位为毫秒(ms)，`click`默认为0，`hover`默认为200|
|exec|Boolean|true|延迟加载的内容是否支持脚本执行，具体参考`lazyload`组件|
|scrollOffset|Number|0|通过Hash定位Tab索引时Tab导航顶部与浏览器顶部的高度差|

### 方法

|名称|参数|返回值|描述|
|:---------------|:--------|:----|:----------|
|render|/|Tabs本身|渲染UI，支持链式|
|goto|index|Tabs本身|切换到第index个Tab，index从**0**开始|

### 事件

|名称|参数|描述|
|:---------------|:--------|:----------|
|switch:before|{node: $this, panel: $pannel, index: index}|node:当前导航节点，panel:当前内容节点,index:当前索引(从0开始)|
|switch:after|{node: $this, panel: $pannel, index: index}|node:当前导航节点，panel:当前内容节点,index:当前索引(从0开始)|

### Hash定位Tab

通过在URL中添加Hash的方式可以轻松定位到某个Tab，即选中某个Tab，Hash的格式为`#id@index`

举个栗子：

需要页面进来直接定位到`$target`为`#J_Tab`的第三个Tab上，那么在页面URL后添加`#J_Tab@2`的Hash即可轻松完成定位

### 注意:

* `switch:before`如果返回`false`，则会阻止此次切换。注意，一定要是`false`而不能是与`false`等价的其他值
* 为防止css命名冲突，组件会在`$target`节点添加`kg-tabs`的className，自定义样式建议添加`.kg-tabs`的命名空间

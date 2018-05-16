customSuspendedScrollbar悬浮的水平滚动条

# 开始使用

## 前端引入插件的样式和js文件，注意jquery要先引入

``` html
<link href="./plugin/customSuspendedScrollbar.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="./javascripts/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="./plugin/jquery.customSuspendedScrollbar.js"></script>
```

## 使用插件
详见index.html
``` js
  $(function () {
    $('#container').customSuspendedScrollbar({
        area: $('#area')
    })
  })
```

## 运行效果
>![enter description here][1]

[1]: https://github.com/lth707/customSuspendedScrollbar/blob/master/%E8%BF%90%E8%A1%8C%E6%95%88%E6%9E%9C/show.gif "show.gif"
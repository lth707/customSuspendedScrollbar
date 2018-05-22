(function ($) {
    $.fn.customSuspendedScrollbar = function (option) {
        var $this = $(this);
        var $area = option.area || $('body');
        var wh = window.innerHeight;
        var ah = $area.height();
        if (ah < wh) { //当area高度小于窗口高度，直接用原生的滚动条
            $area.css({
                'overflow': 'auto'
            });
            return;
        }
        $area.css({
            'overflow': 'hidden'
        })
        // var $parent = $area.parent();
        var parentMarginBottom = 0;
        var parentPaddingBottom = 0;
        // if ($parent.length) {
        //     parentMarginBottom = parseFloat($parent.css('margin-bottom')) || 0;
        //     parentPaddingBottom = parseFloat($parent.css('padding-bottom')) || 0;
        // }
        // var allBottom = parentMarginBottom + parentPaddingBottom;
        var $document = $(document);
        var $window = $(window);
        var $customScrollWrapTemp = $('<div class="custom-suspended-scrollbar tempwrap"></div>'); //用于滚动条悬浮时占位的，防止悬浮过度时跳动。
        var $slider = $('<div class="slider"></div>');
        var $customScrollWrap = $('<div class="custom-suspended-scrollbar wrap"></div>');
        $customScrollWrap.append($slider);
        $this.after($customScrollWrap).after($customScrollWrapTemp);
        $document.scroll(function () {
            var offsettop = $this.offset().top + $this.height();
            var scrollTop = $document.scrollTop();

            if (scrollTop + window.innerHeight > offsettop + 12) {
                $customScrollWrapTemp.hide();
                $customScrollWrap.css({
                    'position': 'static'
                });
            } else {
                $customScrollWrapTemp.show();
                $customScrollWrap.css({
                    'position': 'fixed',
                    'bottom': 0
                });
            }
        })
        if ($area.width() > $this.width()) {
            $customScrollWrap.hide(); //假如area的宽度大于滚动区域，那么把滚动条隐藏起来
        }
        function computeSliderWidth(scale) {
            scale = scale || 1;
            var sliderWidth = scale * 2 * $area.width() - $this.width();
            if (sliderWidth < 150) {
                return computeSliderWidth(scale + 0.2);
            }
            $slider.data('scale', scale);
            return sliderWidth;
        }
        function reSetWidth() {
            $slider.width(computeSliderWidth());
            $customScrollWrap.width($area.width());
            $document.scroll();
            scroll(0)
        }
        reSetWidth();
        $window.resize(function () {
            reSetWidth();
        })
        $slider.on('mousedown', function (event) {
            $slider.data('isMouseDown', true);
            $slider.data('left', event.pageX);
            return false;
        })
        $window.on('mousemove', function (event) {
            var isMouseDown = $slider.data('isMouseDown');
            if (isMouseDown == true) {
                var distance = event.pageX - $slider.data('left');
                $slider.data('left', event.pageX);
                scroll(distance);
            }
        })
        $window.on('mouseup', function () {
            $slider.data('isMouseDown', false);
        });

        function computeScaleK() {
            var containerWidth = $this.width();
            var areaWidth = $area.width();
            var scale = $slider.data('scale') || 1;
            return (containerWidth - areaWidth) / (containerWidth - 2 * areaWidth * scale + areaWidth);
        }
        function scroll(distance) {
            var areaWidth = $area.width();
            var sliderWidth = $slider.width();
            var traceWidth = areaWidth - sliderWidth;
            var scale = $slider.data('scale') || 1;
            var currentLeft = parseFloat($slider.css('left')) || 0;
            var kScale = computeScaleK();
            if (currentLeft <= 0 && distance <= 0) {
                $slider.css('left', 0);
                setTranslate(0);
                return;
            } else if (currentLeft >= traceWidth && distance >= 0) {
                $slider.css('left', traceWidth + 'px');
                setTranslate(-traceWidth * kScale);
                return;
            }
            $slider.css('left', currentLeft + distance + 'px');
            var thisLeft = parseFloat($this.data('left'));
            if (isNaN(thisLeft)) {
                thisLeft = 0;
            }
            setTranslate(thisLeft - distance * kScale);
        }
        function setTranslate(left) {
            $this.css({
                'transform': 'translate(' + left + 'px)',
                '-ms-transform': 'translate(' + left + 'px)', /* Internet Explorer */
                '-moz-transform': 'translate(' + left + 'px)', /* Firefox */
                '-webkit-transform': 'translate(' + left + 'px)', /* Safari 和 Chrome */
                '-o-transform': 'translate(' + left + 'px)', /* Opera */
            })
            $this.data('left', left)
        }
    }
})(jQuery)
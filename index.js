var $ = require('node').all;
var Base = require('base');
var UA = require('ua');
var Uri = require('uri');
var Lazyload = require('kg/datalazyload/2.0.2/');

var lazy;

var Tabs = Base.extend({
    initializer: function(){
        var self = this;
        var $target = self.get('$target');
        if ($target.length) {
            $target.addClass('kg-tabs');
        }
    },
    render: function(){
        var self = this;
        var $target = self.get('$target');
        if (!$target.length) {
            S.log('节点' + $target + '不存在！');
            return;
        }
        self._bind();
        self._handleHash();
        return self;
    },
    goto: function(index){
        index = index * 1; //转换为数值型
        var self = this;
        var $target = self.get('$target');
        var $nav = $target.one('.tabs-nav').all('li');
        var $content = $target.one('.tabs-content');
        var $pannel = $content.all('.tabs-pannel');
        var _index = index < 0 ? self.get('_index') + index : index;
        var $this = $nav.item(_index);
        // node:当前点击的节点，panel:当前点击节点对应的内容节点，index:当前节点的顺序，从0开始
        var flag = self.fire('switch:before', {node: $this, panel: $pannel, index: _index});

        if (flag === false) {
            return;
        }

        var effect = self._getConfig('effect');
        var effectSpeed = self._getConfig('effectSpeed') / 1000; // 转换成秒
        var exec = self._getConfig('exec');

        var $curPannel = $pannel.item(_index);
        var $curNav = $nav.item(_index);

        if ($curPannel && $curNav) {
            $curNav.addClass('selected').siblings().removeClass('selected');
            var after = function(){
                // node:当前点击的节点，panel:当前点击节点对应的内容节点，index:当前节点的顺序，从0开始
                self.fire('switch:after', {node: $this, panel: $pannel, index: _index});
            };
            switch(effect) {
                case 'fade':
                    $curPannel.fadeIn(effectSpeed, after).siblings().hide();
                    break;
                case 'slide':
                    $curPannel.slideDown(effectSpeed, after).siblings().hide();
                    break;
                default :
                    $curPannel.removeClass('hidden').siblings().addClass('hidden');
                    after();
            }

            lazy = new Lazyload({
                container: $curPannel,
                execScript: exec
            });
            self.set('_index', _index);
        }
        return self;
    },
    /* 以下是私有方法 */
    _bind: function(){
        var self = this;
        var $target = self.get('$target');
        var event = self._getConfig('event');
        var delay = self._getConfig('delay');
        var $nav = $target.one('.tabs-nav').all('li');
        var _timer;

        if (UA.mobile) {
            event = 'tap';
        }
        switch(event) {
            case 'hover':
                $nav.on('mouseenter', function(e){
                    e.halt();
                    _timer = S.later(function(){
                        self._handleEvent(e.currentTarget);
                    }, delay);
                }).on('mouseleave', function(e){
                    e.halt();
                    _timer && _timer.cancel && _timer.cancel();
                });
                break;
            case 'click':
            case 'tap':
            default :
                $nav.on(event, function(e){
                    e.halt();
                    S.later(function(){
                        self._handleEvent(e.currentTarget);
                    }, delay);
                });
        }
        $(window).on('hashchange', function(){
            self._handleHash();
        });
    },
    _handleHash: function(){
        var self = this;
        var $target = self.get('$target');
        var scrollOffset = self._getConfig('scrollOffset');
        var hash = new Uri(window.location.href).getFragment();
        var arr = hash.split('@', 2);
        if (arr.length < 2) {
            return;
        }
        if ($target.attr('id') === arr[0] && /\d+/.test(arr[1])) {
            self.goto(arr[1] * 1);
            $(window).scrollTop($target.offset().top - scrollOffset);
        }
    },
    _handleEvent: function(target){
        var self = this;
        var $this = $(target);

        if ($this.hasClass('selected')) {
            return;
        }

        var $target = self.get('$target');
        var $nav = $target.one('.tabs-nav').all('li');
        var index = S.indexOf(target, $nav.getDOMNodes());

        lazy && lazy.destroy();
        self.goto(index);
    },
    _getConfig: function(config){
        var self = this;
        var $target = self.get('$target');
        return $target.attr('data-' + config) ? $target.attr('data-' + config) : self.get(config);
    }
},{
    ATTRS: {
        $target: { //NodeList
            value: '',
            getter: function(v){
                return $(v);
            }
        },
        event: { //String
            value: 'click', //移动端强制为"tap"
            getter: function(v){
                var defined = ['click', 'hover'];
                return S.inArray(v, defined) ? v : 'click';
            }
        },
        effect: { //String
            value: 'none',
            getter: function(v){
                var defined = ['none', 'fade', 'slide'];
                return S.inArray(v, defined) ? v : 'none';
            }
        },
        effectSpeed: { //Number，单位是毫秒
            value: 500,
            getter: function(v){
                return parseInt(v) || 500;
            }
        },
        delay: { //Number，单位是毫秒
            valueFn: function(){
                var self = this;
                var $target = self.get('$target');
                var _delay = 0;
                if (self.get('event') === 'hover' || $target.attr('data-event') === 'hover') {
                    _delay = 200;
                }
                return _delay;
            },
            getter: function(v){
                return +v;
            }
        },
        exec: { //Boolean
            value: true,
            getter: function(v){
                return !!v;
            }
        },
        scrollOffset: { //Number，单位是px
            value: 0,
            getter: function(v){
                return +v;
            }
        },
        /* 以下是私有属性 */
        _index: {
            value: 0
        }
    }
});

module.exports = Tabs;

/**
 * @todo [模板] 多套炫酷模板
 */


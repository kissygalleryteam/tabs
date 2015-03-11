KISSY.add('kg/tabs/1.0.0/plugins/navFixed/navFixed',["node","base","kg/limitfixed/2.0.0/"],function(S ,require, exports, module) {
 /**
 * @fileoverview  导航吸顶插件
 * @author yuesong 
 * Date: 15/2/3
 */

var EMPTY = '';
var $ = require('node').all;
var Base = require('base');
var Fix = require('kg/limitfixed/2.0.0/');

module.exports =  Base.extend({
    pluginInitializer:function(Tabs){
        var self = this;
        if(!Tabs) return;
        self._init(Tabs);
    },
    pluginDestructor: function(){
        var self = this, Tabs = self.get('Tabs');
    },
    resize: function(){
        var self = this;
        var fixed = self.get('limitfixed');
        fixed && fixed.resize();
        return self;
    },
    _init: function(Tabs){
        var self = this;
        var $target = Tabs.get('$target');
        var $nav = $target.one('.tabs-nav');

        self.set('Tabs', Tabs);
        self.set('$target', Tabs.get('$target'));

        var limitfixed = new Fix($nav, {
            limit: $target,
            holder: true
        });
        self.set('limitfixed', limitfixed);

        limitfixed.render();

        limitfixed.on('fixed', function(e){
            if (e.fixed){
                var placeholder = $nav.next();
                $nav.width(placeholder.width());
            }
        });
    }
},{
    ATTRS:{
        pluginId:{
            value:'navFixed'
        },
        Tabs:{
            value:EMPTY
        },
        $target: {
            value:EMPTY
        },
        limitfixed:{
            value:EMPTY
        }
    }
});


});
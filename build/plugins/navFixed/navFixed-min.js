KISSY.add("kg/tabs/1.0.0/plugins/navFixed/navFixed",["node","base","kg/limitfixed/2.0.0/"],function(i,e,t,n){var a="",r=(e("node").all,e("base")),d=e("kg/limitfixed/2.0.0/");n.exports=r.extend({pluginInitializer:function(i){var e=this;i&&e._init(i)},pluginDestructor:function(){{var i=this;i.get("Tabs")}},resize:function(){var i=this,e=i.get("limitfixed");return e&&e.resize(),i},_init:function(i){var e=this,t=i.get("$target"),n=t.one(".tabs-nav");e.set("Tabs",i),e.set("$target",i.get("$target"));var a=new d(n,{limit:t,holder:!0});e.set("limitfixed",a),a.render(),a.on("fixed",function(i){if(i.fixed){var e=n.next();n.width(e.width())}})}},{ATTRS:{pluginId:{value:"navFixed"},Tabs:{value:a},$target:{value:a},limitfixed:{value:a}}})});
/*! For license information please see 7.920595fa.chunk.js.LICENSE.txt */
(this.webpackJsonpgithut2=this.webpackJsonpgithut2||[]).push([[7],{193:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return m}));var n=a(17),r=a.n(n),i=a(21),c=a(16),u=a(0),o=a(147),d=["ApacheConf","ApacheConf","Arduino","Batchfile","BitBake","CMAKE","CMake","CSS","Dockerfile","GCC Machine Description","Gettext Catalog","Gherkin","Groff","HCL","HTML","Handlebars","Jupyter Notebook","Lex","M4","Makefile","NSIS","Nginx","PLSQL","PLpgSQL","Perl6","Protocol Buffer","QMake","SaltStack","Starlark","Scilab","Smarty","TeX","Vue","XML","XSLT","Yacc"],f={vim:{before:["VimL"],after:"Vim script"},fortran:{before:["FORTRAN"],after:"Fortran"}},s=a(11),l=a.n(s),p=a(2);function m(e){var t=e.store,a=e.hist,n=e.table,s=Object(u.useState)({data:[]}),m=Object(c.a)(s,2),b=m[0],h=m[1];function g(e){return l.a.reject((function(e){return l.a.includes(e.name)(d)}))(e)}function j(e){return l.a.map(l.a.update("name")((function(e){var t=l.a.find((function(t){return l.a.includes(e,t.before)}))(f);return t?t.after:e})))(e)}function x(e,t){return l.a.pipe(l.a.filter({name:t}),l.a.first,l.a.omitBy(l.a.isNil))(e)}function k(e,t){return l.a.pipe(l.a.map((function(e){return l.a.assign({trend:x(t,e.name).id-e.id})(e)})),l.a.take(50))(e)}function S(e,t){return l.a.pipe(l.a.map((function(e){return l.a.assign({change:e.count-x(t,e.name).count})(e)})),l.a.take(50))(e)}function v(e,t,a){var n=l.a.map.convert({cap:0})((function(e,t){return l.a.assign({id:++t})(e)}));return l.a.pipe(g,j,n,C)(function(e,t,a){return l.a.pipe(l.a.filter({year:t,quarter:a}),l.a.map(l.a.pick(["name","count"])))(e)}(e,t,a))}function y(){return(y=Object(i.a)(r.a.mark((function e(){var i,u,o,d,f,s,p,m,g,j;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t[0].data;case 2:i=e.sent,u=a[0],o=u.year,d=u.quarter,f=function(e){return l.a.toString(--e)},s=v(i,o,d),p=v(i,f(o),d),m=k(s,p),g=S(m,p),l.a.isEqual(b.data,g)||(j=Object(c.a)(n,2),(0,j[1])({type:"set",payload:g}),h({data:g}));case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function C(e){var t=l.a.pipe(l.a.map("count"),l.a.map(Number),l.a.sum)(e);return l.a.pipe(l.a.map(l.a.update("count")((function(e){return e/t}))))(e)}return Object(u.useEffect)((function(){!function(){y.apply(this,arguments)}()}),[a,n]),b.data.length<50?Object(p.jsx)("div",{className:"emptyTable",children:Object(p.jsx)("h2",{children:"No data available for time period yet"})}):Object(p.jsx)("div",{style:{margin:"auto",maxWidth:810},children:Object(p.jsxs)(o.BootstrapTable,{condensed:!0,striped:!0,tableStyle:{margin:"30px auto 30px auto",width:"100%"},data:b.data,bordered:!1,children:[Object(p.jsx)(o.TableHeaderColumn,{width:"50px",dataAlign:"center",dataField:"id",isKey:!0,children:"# Ranking"}),Object(p.jsx)(o.TableHeaderColumn,{width:"150px",dataAlign:"center",dataField:"name",children:"Programming Language"}),Object(p.jsx)(o.TableHeaderColumn,{width:"100px",dataField:"count",dataAlign:"left",dataFormat:function(e,t){var a=function(e,t){return'<font size="1">(<font color="'.concat(t,'">').concat(e,"%</font>)</font>")},n=function(e){return(100*e).toFixed(3)},r=n(t.count)+"%";return"\xa0".repeat(6)+(t.id>30?r:"".concat(r+"  "+l.a.pipe((function(e){return l.a.isNaN(e)?0:e}),n,(function(e){return e>=0?a("+"+e,"green"):a(e,"chrimson")}))(t.change)))},children:"Percentage (YoY Change)"}),Object(p.jsx)(o.TableHeaderColumn,{width:"50px",dataAlign:"center",dataField:"trend",dataFormat:function(e,t){return"".concat(function(e){var t=function(e){return"<i class='fa fa-angle-".concat(e,"'></i>")};switch(!0){case 0===e:return"";case e>3:return t("double-up");case e<-3:return t("double-down");case e<0:return t("down");case e>0:return t("up");default:return t("double-up")}}(e))},children:"YoY Trend"})]})})}}}]);
//# sourceMappingURL=7.920595fa.chunk.js.map
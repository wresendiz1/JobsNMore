"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[405],{8029:function(e,n,t){t.r(n);var c=t(9439),a=t(2791),r=t(9743),o=t(2677),u=t(9140),s=t(1087),i=t(7022),l=t(3257),p=t(1994),d=t(1382),f=t(9146),h=t(184);n.default=function(){var e=(0,a.useState)(),n=(0,c.Z)(e,2),t=n[0],m=n[1],g=(0,a.useState)(),_=(0,c.Z)(g,2),j=_[0],x=_[1],v=(0,a.useRef)(),Z=(0,a.useRef)(),b=(0,a.useRef)(30);return(0,a.useEffect)((function(){fetch("/api/occupations").then((function(e){return e.json()})).then((function(e){x(e.Occupations),m(e.Page)})).catch((function(e){return console.log(e)}))}),[]),(0,h.jsxs)(l.Z,{children:[t&&(0,h.jsx)(p.Z,{page_name:"Occupations",page:t,handler:function(e,n,c){c.preventDefault(),fetch("/api/occupations?page=".concat(t[0].current_page,"&per_page=").concat(b.current.value,"&sort_by=").concat(e.current.value,"&order=").concat(n.current.value)).then((function(e){return e.json()})).then((function(e){x(e.Occupations),m(e.Page)}))},value_name:[{id:"onetCode",name:"Relevance"},{id:"cluster",name:"Cluster"},{id:"median_wage",name:"Median Wage"},{id:"pct90_wage",name:"90th Wage"},{id:"outlook",name:"Outlook"},{id:"curr_employment",name:"Job Title"},{id:"proj_openings",name:"Projected Openings"},{id:"percent_change",name:"Percent Change in Employment"}],order:v,sort:Z,show_handler:function(e,n){n.preventDefault(),fetch("/api/occupations?page=1&sort_by=".concat(Z.current.value,"&order=").concat(v.current.value,"&per_page=").concat(e.current.value)).then((function(e){return e.json()})).then((function(e){x(e.Occupations),m(e.Page)}))},items_per_page:b,default_items:30}),(0,h.jsx)(i.Z,{children:(0,h.jsx)(r.Z,{className:"row row-cols-1 row-cols-md-3 py-4 gy-4",children:j&&j.map((function(e){return(0,h.jsx)(o.Z,{children:(0,h.jsx)(u.Z,{className:"m-3",children:(0,h.jsxs)(u.Z.Body,{children:[(0,h.jsx)(u.Z.Title,{children:e.title}),(0,h.jsx)(u.Z.Subtitle,{className:"mb-2 text-muted",children:e.cluster}),(0,h.jsx)(s.rU,{to:"/Occupations/".concat(e.onetCode),className:"btn btn-primary mx-2",children:"Info"}),(0,h.jsx)(s.rU,{to:"/Clusters/".concat(e.cluster),className:"btn btn-info mx-2",children:"Cluster Info"})]})})},e.onetCode)}))})}),(0,h.jsx)(i.Z,{className:"d-flex justify-content-center",children:j&&(0,h.jsx)(d.Z,{change:function(e){var n="/api/occupations?sort_by=".concat(Z.current.value,"&order=").concat(v.current.value,"&per_page=").concat(b.current.value,"&page=");(0,f.u)(e,n,t).then((function(e){x(e.Occupations),m(e.Page)}))},total_pages:t[0].total,current_page:t[0].current_page})})]})}}}]);
//# sourceMappingURL=405.b6c61826.chunk.js.map
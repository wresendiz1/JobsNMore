"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[322],{30:function(e,n,t){t.r(n);var r=t(9439),a=t(2791),c=t(7022),o=t(9140),u=t(7689),s=t(1087),i=t(3257),l=t(3360),f=t(1382),d=t(9146),p=t(1994),h=t(184);n.default=function(){var e=(0,u.UO)().id,n=(0,a.useState)(),t=(0,r.Z)(n,2),b=t[0],m=t[1],g=(0,a.useState)(),j=(0,r.Z)(g,2),x=j[0],v=j[1],_=(0,a.useRef)(),Z=(0,a.useRef)(),y=(0,a.useState)(),J=(0,r.Z)(y,2),w=J[0],C=J[1],P=(0,s.lr)(),k=(0,r.Z)(P,1)[0],D=(0,a.useRef)(50);return(0,a.useEffect)((function(){C(k.get("course")),fetch("/api/jobs/course/".concat(e)).then((function(e){return e.json()})).then((function(e){m(e.Jobs),v(e.Page)})).catch((function(e){return console.log(e)}))}),[]),(0,h.jsxs)(i.Z,{children:[x&&(0,h.jsx)(p.Z,{page_name:"Jobs where course, "+w+", can elevate your chances of getting the job",page:x,handler:function(n,t,r){r.preventDefault(),fetch("/api/jobs/course/".concat(e,"?page=").concat(x[0].current_page,"&per_page=").concat(D.current.value,"&sort_by=").concat(n.current.value,"&order=").concat(t.current.value)).then((function(e){return e.json()})).then((function(e){m(e.Jobs),v(e.Page)}))},value_name:[{id:"Id",name:"Relevance"},{id:"Company",name:"Company"},{id:"DatePosted",name:"Date Posted"},{id:"JCityID",name:"Job Location"},{id:"OnetCode",name:"Occupation Code"},{id:"JobTitle",name:"Job Title"}],order:_,sort:Z,show_handler:function(n,t){t.preventDefault(),fetch("/api/jobs/course/".concat(e,"?page=1&sort_by=").concat(Z.current.value,"&order=").concat(_.current.value,"&per_page=").concat(n.current.value)).then((function(e){return e.json()})).then((function(e){m(e.Jobs),v(e.Page)}))},items_per_page:D}),(0,h.jsx)(c.Z,{className:"d-flex flex-wrap justify-content-center",children:x&&b.map((function(e){return(0,h.jsx)(o.Z,{className:"m-3",style:{width:"18rem"},children:(0,h.jsxs)(o.Z.Body,{children:[(0,h.jsx)(o.Z.Title,{children:e.JobTitle}),(0,h.jsx)(o.Z.Subtitle,{className:"mb-2 text-muted",children:e.Company}),(0,h.jsx)(o.Z.Text,{children:e.Location}),(0,h.jsx)(l.Z,{variant:"primary",href:e.Url,target:"_blank",rel:"noopener noreferrer",children:"View Job"}),(0,h.jsx)(s.rU,{to:"/jobs/".concat(e.Id),className:"btn btn-primary mx-2",children:"More Info"})]})},e.Id)}))}),(0,h.jsx)(c.Z,{className:"d-flex flex-wrap justify-content-center",children:x&&(0,h.jsx)(f.Z,{change:function(n){var t="/api/jobs/course/".concat(e,"?sort_by=").concat(Z.current.value,"&order=").concat(_.current.value,"&per_page=").concat(D.current.value,"&page=");(0,d.u)(n,t,x).then((function(e){m(e.Jobs),v(e.Page)}))},total_pages:x[0].total,current_page:x[0].current_page})})]})}}}]);
//# sourceMappingURL=322.0bf028f0.chunk.js.map
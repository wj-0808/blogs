import{f as U,u as z,n as D,p as v,q as $,A,r as n,g as w,j as t,w as l,t as b,h as F,F as x,o as c,z as p,c as C,x as M,s as j,E as q,v as P,_ as R}from"./vue-router-bab8ae27.js";import{C as S}from"./category-d3a474a1.js";import{h as k}from"./http-322f23cb.js";const T={style:{margin:"10px 0"}},W=U({__name:"articleList",setup(G){const m=z(),o=D({cate_id1:"",cate_id2:"",value:"",offset:0}),f=v(0),g=v([]);$(()=>{d()}),A(async s=>{console.log({...o}),s(()=>{d({...o})})});const d=s=>{k.get("/article",{params:{...s}}).then(a=>{let{list:i,count:u}=a.data;g.value=i,f.value=u})},h=async s=>{await k.delete("/article/"+s),await d({...o}),q.success("删除成功")};return(s,a)=>{const i=n("el-button"),u=n("el-input"),r=n("el-table-column"),V=n("el-image"),B=n("el-tag"),E=n("el-popconfirm"),L=n("el-table"),N=n("el-pagination");return c(),w(x,null,[t(i,{"auto-insert-space":!0,onClick:a[0]||(a[0]=e=>b(m).push("./article"))},{default:l(()=>[p("添加文章")]),_:1}),F("div",T,[t(u,{style:{width:"200px"},modelValue:o.value,"onUpdate:modelValue":a[1]||(a[1]=e=>o.value=e),placeholder:"搜索",clearable:""},null,8,["modelValue"]),t(S,{id1:o.cate_id1,"onUpdate:id1":a[2]||(a[2]=e=>o.cate_id1=e),id2:o.cate_id2,"onUpdate:id2":a[3]||(a[3]=e=>o.cate_id2=e)},null,8,["id1","id2"])]),t(L,{data:g.value,"row-key":"_id",stripe:"",style:{width:"100%"},"empty-text":"没有文章"},{default:l(()=>[t(r,{type:"index",width:"50"}),t(r,{prop:"title",label:"标题"}),t(r,{label:"封面"},{default:l(e=>[e.row.img?(c(),C(V,{key:0,style:{width:"80px",height:"80px"},src:e.row.img,fit:"cover"},null,8,["src"])):M("v-if",!0)]),_:1}),t(r,{prop:"description",label:"描述","show-overflow-tooltip":""}),t(r,{label:"关键字"},{default:l(e=>[(c(!0),w(x,null,j(e.row.keyWords,(_,y)=>(c(),C(B,{type:["","success","info","warning","danger"][y%5],style:{"margin-right":"5px"},key:y},{default:l(()=>[p(P(_),1)]),_:2},1032,["type"]))),128))]),_:1}),t(r,{label:"操作"},{default:l(e=>[t(i,{size:"small",type:"primary",plain:"",onClick:_=>b(m).push("./article?id="+e.row._id)},{default:l(()=>[p("编辑")]),_:2},1032,["onClick"]),t(E,{onConfirm:_=>h(e.row._id),title:"确认删除吗？多可惜！","confirm-button-text":"是","cancel-button-text":"不了"},{reference:l(()=>[t(i,{size:"small",type:"danger",plain:""},{default:l(()=>[p("删除")]),_:1})]),_:2},1032,["onConfirm"])]),_:1})]),_:1},8,["data"]),t(N,{class:"pagination",background:"",layout:"prev, pager, next",total:f.value,"current-page":o.offset,"onUpdate:currentPage":a[4]||(a[4]=e=>o.offset=e)},null,8,["total","current-page"])],64)}}}),K=R(W,[["__file","D:/Code/blogs/web/src/admin/views/articleList.vue"]]);export{K as default};

import{f as $,n as z,p as w,q as A,A as D,g as v,j as t,w as l,t as b,h as F,F as x,r as n,o as c,z as p,c as k,x as L,s as M,u as j,E as q,v as P}from"./vue-router-0730c5e2.js";import{_ as R}from"./category.vue_vue_type_script_setup_true_lang-d28952a6.js";import{h}from"./http-4c58a941.js";const S={style:{margin:"10px 0"}},I=$({__name:"articleList",setup(T){const m=j(),o=z({cate_id1:"",cate_id2:"",value:"",offset:0}),f=w(0),g=w([]);A(()=>{u()}),D(async s=>{console.log({...o}),s(()=>{u({...o})})});const u=s=>{h.get("/article",{params:{...s}}).then(a=>{let{list:i,count:d}=a.data;g.value=i,f.value=d})},C=async s=>{await h.delete("/article/"+s),await u({...o}),q.success("删除成功")};return(s,a)=>{const i=n("el-button"),d=n("el-input"),r=n("el-table-column"),V=n("el-image"),B=n("el-tag"),E=n("el-popconfirm"),N=n("el-table"),U=n("el-pagination");return c(),v(x,null,[t(i,{"auto-insert-space":!0,onClick:a[0]||(a[0]=e=>b(m).push("./article"))},{default:l(()=>[p("添加文章")]),_:1}),F("div",S,[t(d,{style:{width:"200px"},modelValue:o.value,"onUpdate:modelValue":a[1]||(a[1]=e=>o.value=e),placeholder:"搜索",clearable:""},null,8,["modelValue"]),t(R,{id1:o.cate_id1,"onUpdate:id1":a[2]||(a[2]=e=>o.cate_id1=e),id2:o.cate_id2,"onUpdate:id2":a[3]||(a[3]=e=>o.cate_id2=e)},null,8,["id1","id2"])]),t(N,{data:g.value,"row-key":"_id",stripe:"",style:{width:"100%"},"empty-text":"没有文章"},{default:l(()=>[t(r,{type:"index",width:"50"}),t(r,{prop:"title",label:"标题"}),t(r,{label:"封面"},{default:l(e=>[e.row.img?(c(),k(V,{key:0,style:{width:"80px",height:"80px"},src:e.row.img,fit:"cover"},null,8,["src"])):L("",!0)]),_:1}),t(r,{prop:"description",label:"描述","show-overflow-tooltip":""}),t(r,{label:"关键字"},{default:l(e=>[(c(!0),v(x,null,M(e.row.keyWords,(_,y)=>(c(),k(B,{type:["","success","info","warning","danger"][y%5],style:{"margin-right":"5px"},key:y},{default:l(()=>[p(P(_),1)]),_:2},1032,["type"]))),128))]),_:1}),t(r,{label:"操作"},{default:l(e=>[t(i,{size:"small",type:"primary",plain:"",onClick:_=>b(m).push("./article?id="+e.row._id)},{default:l(()=>[p("编辑")]),_:2},1032,["onClick"]),t(E,{onConfirm:_=>C(e.row._id),title:"确认删除吗？多可惜！","confirm-button-text":"是","cancel-button-text":"不了"},{reference:l(()=>[t(i,{size:"small",type:"danger",plain:""},{default:l(()=>[p("删除")]),_:1})]),_:2},1032,["onConfirm"])]),_:1})]),_:1},8,["data"]),t(U,{class:"pagination",background:"",layout:"prev, pager, next",total:f.value,"current-page":o.offset,"onUpdate:currentPage":a[4]||(a[4]=e=>o.offset=e)},null,8,["total","current-page"])],64)}}});export{I as default};

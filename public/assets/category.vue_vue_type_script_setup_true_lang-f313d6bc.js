import{f as v,p as u,q as _,D as c,g as f,j as m,J as g,K as V,F as h,r as y,o as B}from"./vue-router-0730c5e2.js";import{h as C}from"./http-402eca65.js";const x=v({__name:"category",props:{id1:null,id2:null},emits:["update:id1","update:id2"],setup(b,{emit:i}){const o=u(""),p=u([]),t=u(""),n=u([]);_(()=>{d()}),c(o,async(e,l)=>{if(!o.value){t.value="",n.value=[];return}d(e),i("update:id1",e)}),c(t,async(e,l)=>{i("update:id2",e)});const d=e=>{let l="/category";e&&(l+="/"+e),t.value="",C.get(l).then(s=>{let a=s.data.list.map(r=>({value:r._id,label:r.name}));a.unshift({value:"",label:"全部"}),e?n.value=a:p.value=a})};return(e,l)=>{const s=y("el-select-v2");return B(),f(h,null,[m(s,{modelValue:o.value,"onUpdate:modelValue":l[0]||(l[0]=a=>o.value=a),options:p.value,placeholder:"请选择一级类目"},null,8,["modelValue","options"]),g(m(s,{modelValue:t.value,"onUpdate:modelValue":l[1]||(l[1]=a=>t.value=a),options:n.value,placeholder:"请选择二级类目"},null,8,["modelValue","options"]),[[V,n.value.length]])],64)}}});export{x as _};

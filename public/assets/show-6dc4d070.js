import{f as u,q as a,y as l,u as i}from"./vue-router-0730c5e2.js";import{h as o}from"./http-4c58a941.js";const g=u({__name:"show",setup(p){const s=l();i();const{id:t,type:n}=s.query;a(()=>{n=="article"?r():c()});const r=()=>{o.get("/article/"+t).then(e=>{console.log(e)})},c=()=>{o.get("/work/"+t).then(e=>{console.log(e)})};return(e,f)=>null}});export{g as default};
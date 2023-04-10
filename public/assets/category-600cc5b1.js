import{h as p}from"./http-4c58a941.js";import{f as x,n as k,q as v,g as V,j as l,w as r,F as B,E as s,r as u,o as h,z as d,c as E,x as z,I as M}from"./vue-router-0730c5e2.js";const N=f=>c=>toString.call(c)==`[object ${f}]`,T=N("String"),S=x({__name:"category",setup(f){const c=k({tableData:[]});v(async()=>{await m()});const y=async(t,a=!1)=>{let{_id:e,name:n,status:_}=t;a&&(n=await w("修改类目",n)),await b(e,{name:n,status:_}),m()},w=async(t,a="")=>{let e;return await M.prompt("请输入类目名",t,{confirmButtonText:"确认",cancelButtonText:"取消",inputValue:a}).then(({value:n})=>e=n).catch(()=>console.warn("用户取消操作")),e},m=async()=>{let t=new Map;await p.get("/category/all").then(a=>{a.data.list.forEach(e=>{e.parent?t.get(e.parent).children.push(e):(e.children=[],t.set(e._id,e))})}),c.tableData=Array.from(t.values())},g=async t=>{let a=await w("添加类目");if(!a)return s.warning("类名不能为空");let e={name:a};T(t)&&(e.parent=t),p.post("/category",e).then(n=>{s.success("添加成功"),m()}).catch(n=>{s.error("添加失败")})},b=async(t,a)=>{if(!a.name)return s.warning("类名不能为空");await p.put("/category/"+t,a).then(e=>{s.success("修改成功")}).catch(e=>{s.error("修改失败")})};return(t,a)=>{const e=u("el-button"),n=u("el-table-column"),_=u("el-switch"),C=u("el-table");return h(),V(B,null,[l(e,{style:{"margin-bottom":"10px"},type:"primary",plain:"",onClick:g},{default:r(()=>[d("新增一级类目")]),_:1}),l(C,{data:c.tableData,border:!0,style:{width:"100%"},"row-key":"_id","empty-text":"没有类目"},{default:r(()=>[l(n,{label:"名称",prop:"name"}),l(n,{label:"状态"},{default:r(o=>[l(_,{modelValue:o.row.status,"onUpdate:modelValue":i=>o.row.status=i,style:{"--el-switch-on-color":"#13ce66","--el-switch-off-color":"#ff4949"},size:"small",onChange:i=>y(o.row)},null,8,["modelValue","onUpdate:modelValue","onChange"])]),_:1}),l(n,{label:"操作"},{default:r(o=>[l(e,{size:"small",type:"info",plain:"",onClick:i=>y(o.row,!0)},{default:r(()=>[d("修改类目")]),_:2},1032,["onClick"]),o.row.parent?z("",!0):(h(),E(e,{key:0,size:"small",type:"primary",plain:"",onClick:i=>g(o.row._id)},{default:r(()=>[d("添加子类")]),_:2},1032,["onClick"]))]),_:1})]),_:1},8,["data"])],64)}}});export{S as default};

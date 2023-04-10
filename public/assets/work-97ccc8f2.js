import{f as E,n as b,q as R,p as M,g as u,j as s,w as a,F as x,y as N,r as c,o as n,h as v,z as y,s as S,E as f,I as T,u as $,c as I,v as K}from"./vue-router-0730c5e2.js";import{_ as P}from"./goBack.vue_vue_type_script_setup_true_lang-b03f38f4.js";import{h as p}from"./http-4c58a941.js";const j=["src"],A={key:1,class:"fa fa-plus-square-o font-plus",size:"200px"},L=["href"],G={key:1,class:"fa fa-plus-square-o font-plus",size:"200px"},Y=E({__name:"work",setup(H){const l=b({title:"",description:"",keyWords:[],img:"",workUrl:""}),m=N();R(async()=>{let{id:e}=m.query;e&&await q(e)});const q=e=>{p.get("/work/"+e).then(o=>{const r=o.data.article;["title","workUrl","description","keyWords","img"].forEach(t=>{l[t]=r[t]})})},w=M(),_=(e,o="blur")=>({required:!0,message:e,trigger:o}),U=b({title:_("作品标题不能为空"),workUrl:_("请上传作品"),description:_("描述不能为空")}),V=async e=>{let{file:o}=e,r=new FormData;r.append("file",o);let{data:t}=await p.post("/upload/img",r);l.img=t.file.url},B=async e=>{let{file:o}=e,r=new FormData;r.append("file",o);let{data:t}=await p.post("/upload/work",r);l.workUrl=t.work.url},g=()=>{f.success("上传成功")},C=async()=>{await T.prompt("请输入关键字","关键字",{confirmButtonText:"确认",cancelButtonText:"取消"}).then(({value:e})=>l.keyWords.push(e)).catch(()=>console.warn("用户取消操作"))},D=e=>{l.keyWords.splice(0,1)},F=async e=>{e&&await e.validate((o,r)=>{if(o){let t={...l};console.log(t),m.query.id?p.put("/work/"+m.query.id,t).then(d=>{f.success("提交成功")}):p.post("/work",t).then(d=>{f.success("提交成功")})}else f.warning("输入不完整")})};return $(),(e,o)=>{const r=c("el-input"),t=c("el-form-item"),d=c("el-upload"),h=c("el-button"),W=c("el-tag"),z=c("el-form");return n(),u(x,null,[s(P,{content:"作品"}),s(z,{"label-position":"top",ref_key:"ruleFormRef",ref:w,"label-width":"100px","status-icon":"",rules:U,model:l,style:{"max-width":"800px"}},{default:a(()=>[s(t,{label:"标题：",prop:"title"},{default:a(()=>[s(r,{modelValue:l.title,"onUpdate:modelValue":o[0]||(o[0]=i=>l.title=i),placeholder:"Please input",clearable:""},null,8,["modelValue"])]),_:1}),s(t,{label:"描述：",prop:"description"},{default:a(()=>[s(r,{modelValue:l.description,"onUpdate:modelValue":o[1]||(o[1]=i=>l.description=i),placeholder:"Please input",clearable:""},null,8,["modelValue"])]),_:1}),s(t,{label:"封面："},{default:a(()=>[s(d,{class:"uploader","http-request":V,"show-file-list":!1,"on-success":g},{default:a(()=>[l.img?(n(),u("img",{key:0,src:l.img,class:"avatar"},null,8,j)):(n(),u("i",A))]),_:1})]),_:1}),s(t,{label:"文件：",prop:"workUrl"},{default:a(()=>[s(d,{class:"uploader","http-request":B,"show-file-list":!1,"on-success":g},{default:a(()=>[l.workUrl?(n(),u("a",{key:0,href:l.workUrl,target:"_blank",rel:"noopener noreferrer"},"链接",8,L)):(n(),u("i",G))]),_:1})]),_:1}),s(t,{label:"关键字："},{default:a(()=>[v("div",null,[s(h,{size:"small",onClick:C},{default:a(()=>[y("添加")]),_:1}),v("div",null,[(n(!0),u(x,null,S(l.keyWords,(i,k)=>(n(),I(W,{key:k,onClose:J=>D(k),type:["","success","info","warning","danger"][k%5],size:"small",style:{"margin-right":"5px"},closable:""},{default:a(()=>[y(K(i),1)]),_:2},1032,["onClose","type"]))),128))])])]),_:1}),s(t,null,{default:a(()=>[s(h,{type:"primary",onClick:o[2]||(o[2]=i=>F(w.value))},{default:a(()=>[y("确定")]),_:1})]),_:1})]),_:1},8,["rules","model"])],64)}}});export{Y as default};
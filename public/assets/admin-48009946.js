import{_ as a,o as i,c,r as s,a as m,b as p,d as e,e as u,i as d}from"./vue-router-0730c5e2.js";const L={};function l(t,_){const o=s("RouterView");return i(),c(o)}const E=a(L,[["render",l]]),r=m({history:p(),routes:[{path:"/login",name:"Login",component:()=>e(()=>import("./login-369618e5.js"),["assets/login-369618e5.js","assets/vue-router-0730c5e2.js","assets/vue-router-cbc2892a.css","assets/http-4c58a941.js"])},{path:"/",name:"Index",component:()=>e(()=>import("./index-a7ccf622.js"),["assets/index-a7ccf622.js","assets/vue-router-0730c5e2.js","assets/vue-router-cbc2892a.css"]),redirect:t=>"/articleList",children:[{path:"/articleList",name:"articleList",component:()=>e(()=>import("./articleList-d0f2e6d7.js"),["assets/articleList-d0f2e6d7.js","assets/vue-router-0730c5e2.js","assets/vue-router-cbc2892a.css","assets/category.vue_vue_type_script_setup_true_lang-d28952a6.js","assets/http-4c58a941.js"])},{path:"/article",name:"article",component:()=>e(()=>import("./article-258b010c.js"),["assets/article-258b010c.js","assets/vue-router-0730c5e2.js","assets/vue-router-cbc2892a.css","assets/category.vue_vue_type_script_setup_true_lang-d28952a6.js","assets/http-4c58a941.js","assets/goBack.vue_vue_type_script_setup_true_lang-b03f38f4.js","assets/article-de210c0b.css"])},{path:"/category",name:"category",component:()=>e(()=>import("./category-600cc5b1.js"),["assets/category-600cc5b1.js","assets/http-4c58a941.js","assets/vue-router-0730c5e2.js","assets/vue-router-cbc2892a.css","assets/category-72d60bf3.css"])},{path:"/workList",name:"workList",component:()=>e(()=>import("./workList-b72e4b6f.js"),["assets/workList-b72e4b6f.js","assets/vue-router-0730c5e2.js","assets/vue-router-cbc2892a.css","assets/http-4c58a941.js"])},{path:"/work",name:"work",component:()=>e(()=>import("./work-97ccc8f2.js"),["assets/work-97ccc8f2.js","assets/vue-router-0730c5e2.js","assets/vue-router-cbc2892a.css","assets/goBack.vue_vue_type_script_setup_true_lang-b03f38f4.js","assets/http-4c58a941.js","assets/work-fe9fc1ac.css"])}]}]});r.beforeEach(async(t,_)=>{let o=sessionStorage.getItem("token");if(!o&&t.name!=="Login")return{name:"Login"};if(o&&t.name=="Login")return{name:"Index"}});const n=u(E);n.use(d);n.use(r);n.mount("#app");

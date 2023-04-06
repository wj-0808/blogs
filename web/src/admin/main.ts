import { createApp } from 'vue'
import Admin from './Admin.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './routes'

const app = createApp(Admin)
app.use(ElementPlus)
app.use(router)
app.mount('#app')

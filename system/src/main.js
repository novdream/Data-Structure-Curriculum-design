
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


import Screen from './components/screen.vue'
const screen=createApp(Screen)
screen.use(ElementPlus)
screen.mount('#Screen')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    screen.component(key, component)
}

import { createApp } from 'vue'
import ValueButton from './components/main.vue'
import FileInput from './components/fileinput.vue'
import ElementPlus from 'element-plus'
import RandomFile from './components/randomfile.vue'
import 'element-plus/dist/index.css'


const valuebutton=createApp(ValueButton)
valuebutton.use(ElementPlus)
valuebutton.mount('#ValueButton')

const fileinput=createApp(FileInput)
fileinput.use(ElementPlus)
fileinput.mount('#FileInput')

const randomfile=createApp(RandomFile)
randomfile.use(ElementPlus)
randomfile.mount('#RandomFile')




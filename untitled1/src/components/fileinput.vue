<template>
<section v-if="!show">
  <el-popover
      placement="top-start"
      title="提示"
      :width="150"
      trigger="hover"
      content="只允许选择txt文件"
  >
    <template #reference>
      <el-button class="info" >i</el-button>
    </template>

  </el-popover>
  <input type="file" class="file_input" ref=“uploadInput” @change="handleUpload" accept="text/plain">
  <appendbutton :msg="msg1"  style="margin-top:500px" @click="textChange"></appendbutton>
</section>

  <section v-else>
    <HuffmanButton :key_value="tableData" ></HuffmanButton>
  </section>

</template>

<style scoped>
.file_input[type="file"]{
  position: absolute;

  top:50%;
  left:45%;
  width: 150px;
  height: 25px;
}
.info{
  position: absolute;
  top:50%;
  left:58%;
  font-weight: bolder;
  border-radius: 40px;
  margin-top: -2px;
}

</style>
<script setup>
import appendbutton from '@/components/appendbutton.vue'
import HuffmanButton from "@/components/buildhuffman.vue";
import {ref} from "vue";
import { ElMessage } from 'element-plus'

const msg1='构建哈夫曼树'
const characters ="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`~!@#$%^&*()_+=-[]{}|\\;:'\",./<>?"
let tableData=ref([])//从文件读取的数据存储,格式是key,value
const chineseRegex = /^[\u4e00-\u9fa5]/; // 使用 Unicode 范围匹配汉字
let show = ref(false);
const uploadInput = ref(null);
let temp = {};
let file, filePath = null;

const handleUpload = (event) => {
  file = event.target.files[0]; // 获取第一个上传的文件
  filePath = URL.createObjectURL(file); // 获取文件路径
  temp = {};
  tableData=ref([]);
  const reader = new FileReader();
  reader.onload = (e) => {
    const fileContent = e.target.result; // 获取文件内容
    for(let i=0;i<fileContent.length;i++){
      if(characters.includes(fileContent[i])||(chineseRegex.test(fileContent[i]))){

        if(!temp[fileContent[i]])
          temp[fileContent[i]]=1;
        else
          temp[fileContent[i]]++;
      }
    }

    for(let item in temp){
      tableData.value.push({
        key:item,
        value:temp[item]
      })
    }
  };
  reader.readAsText(file); // 以文本形式读取文件内容
}
//读文件
function textChange(){

  if(filePath===null){
    ElMessage.error('请选择文件')
    return
  }
  if(tableData.value.length<2){
    ElMessage.error('文件键值对个数需要大于等于2！')
    return
  }
  show.value=true;
}
</script>

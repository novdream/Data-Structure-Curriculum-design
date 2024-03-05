<template>
  <section v-if="show">
    <appendbutton :msg="msg" style="margin-top:400px" @click="createfile"></appendbutton>
    <appendbutton :msg="msg1" style="margin-top:500px" @click="check"></appendbutton>
  </section>
  <section v-else>
    <HuffmanButton :key_value="tableData"></HuffmanButton>
  </section>
</template>

<script setup>
import appendbutton from '@/components/appendbutton.vue'
import {ref} from 'vue'
import HuffmanButton from "@/components/buildhuffman.vue";
import seedrandom from 'seedrandom';
import { ElMessage } from 'element-plus'

const msg="随机生成文件";
const msg1="构建哈夫曼树";
const characters ="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`~!@#$%^&*()_+=-[]{}|\\;:'\",./<>?"
let show=ref(true)
let tableData=ref([]);
let is_created=ref(false);

function randomcreate(fileContent){
  const seed = Date.now().toString(); // 使用当前时间作为种子
  const rng = seedrandom(seed);
  const min = 0x4e00; // 汉字的最小 Unicode 编码值
  const max = 0x9fa5; // 汉字的最大 Unicode 编码值


  let length=Math.floor(rng() * 200)+1;//长度2-200
  if(length===1)
    length++;

  for(let i=0;i<length;i++){
    if(rng()<0.7){
      const index=Math.floor(rng() * characters.length);
      fileContent.value+=characters.charAt(index);
    }
    else{
      const randomCode = Math.floor(rng()* (max - min + 1)) + min;
      // 将 Unicode 编码值转换为汉字字符
      const randomChineseCharacter = String.fromCharCode(randomCode);
      fileContent.value+=randomChineseCharacter;
    }
  }
  is_created.value=true;
}
//获取键值对
function countFileContent(fileContent,tableData){
  let temp = {};
  for(let i=0; i<fileContent.value.length; i++){
    if(!temp[fileContent.value[i]])
      temp[fileContent.value[i]]=1;
    else
      temp[fileContent.value[i]]++;
  }

  for(let item in temp){
    tableData.value.push({
      key:item,
      value:temp[item]
    })
  }

}
function createfile(){
  let fileContent = ref("");
  randomcreate(fileContent)//随机生成内容
  countFileContent(fileContent,tableData)
  console.log(tableData.value)

  const fileName = 'randomfile.txt';
  const blob = new Blob([fileContent.value], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
  ElMessage({
    message: '随机文件已生成！',
    type: 'success',
    duration:1000
  })
}
function check(){
  if(is_created.value===false){
    ElMessage.error('未生成随机文件')

    return
  }
  if(tableData.value.length<2){
    ElMessage.error('文件键值对个数需要大于等于2')
    return
  }
  show.value=false;
}
</script>
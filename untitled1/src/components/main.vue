<template>
  <!--  展示键值对部分-->
  <section v-if="!show">
    <el-table :data="tableData" :default-sort="{ prop: 'value', order: 'descending' }" style="height:450px;width: 1000px;position:absolute;left:50%;margin:20px auto 20px -500px;">
      <el-table-column prop="key" label="关键值" width="300" />
      <el-table-column prop="value" label="频率" width="300"/>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-button
              link
              type="primary"
              size="small"
              @click.prevent="deleteRow(scope.$index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-input v-model="input" placeholder="请输入关键值" show-word-limit maxlength="1" style="height:40px;position: absolute; top: 58%;left: 30%;width:300px"/>
    <el-input-number v-model="num" :min="1"  size="large"  style="height: 40px;position: absolute;top:58%;left:55%;"/>
    <appendbutton :msg="msg" @click="append"></appendbutton>
    <appendbutton :msg="msg1" @click="build" style="margin-top:700px"></appendbutton>
  </section>
<!--  构建树的模块-->
  <section v-else>
    <HuffmanButton :key_value="tableData"></HuffmanButton>
  </section>

</template>

<script lang="ts" setup>

import { ref } from 'vue'
import HuffmanButton from './buildhuffman.vue'
import appendbutton from './appendbutton.vue'
import { ElMessage } from 'element-plus'
const input = ref('')
const msg=ref('添加键值对')
const msg1=ref('构建哈夫曼树')
const num = ref(1)
const tableData=ref([]);
let flag=false;
let show=ref(false);
//添加键值对
function append(){

  flag=true;
  if(flag){
    if(input.value&&input.value!==' '){
      if(search(tableData,input.value,num.value)) {
        ElMessage({
          message: '成功更新该关键值的频率',
          type: 'success',
          duration: 1000
        })
        return
      }
          tableData.value.push({
            key:input.value,
            value:num.value
          })
        ElMessage({
          message: '成功添加键值对',
          type: 'success',
          duration: 1000
        })
    }
    else{
      ElMessage.error("关键值为空")

    }
  }
}
//是否有相同的关键值
function search(tableData,input,num){
  let flag = false;
  for(let item of tableData.value){
    if(item.key===input){
      item.value=num;
      flag=true
    }

  }
  return flag
}
// 删除键值对函数
const deleteRow = (index1: number) => {
  tableData.value.splice(index1, 1);
  ElMessage({
    message: '成功删除键值对',
    type: 'success',
    duration: 1000
  })
}
function build(){
  if(tableData.value.length<2){
    ElMessage.error("键值对个数需要大于等于2")
    return
  }
  show.value=true;
}
</script>


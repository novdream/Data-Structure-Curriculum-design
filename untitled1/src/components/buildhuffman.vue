<template>
  <el-table :data="huffmancode" max-height="700" style="width: 300px;position: absolute;top:10%;left:5%">
    <el-table-column prop="order" label="序号" />
    <el-table-column prop="key" label="关键值" width="100px" />
    <el-table-column prop="code" label="哈夫曼编码" width="100px" />
  </el-table>
<!--  <canvas id="canvas" style="width:850px; height:700px; border:1px solid black;position: absolute;top:10%;left:30%"></canvas>-->
  <visual :root="root"></visual>
</template>
<script setup>
import {ref} from 'vue'
import {buildHuffmanTree, generateHuffmanCodes} from '@/assets/js/huffman'
import visual from './visualtree.vue'
const props=defineProps({
  key_value:ref([])
})

const huffmancode=ref([]);//存储哈夫曼编码的 其中一个数据格式是order，key，code
const characters=[];//初始的所有关键词
const frequencies=[];//初始的频率

for ( let item of props.key_value){
  characters.push(item.key)
  frequencies.push(item.value)
}

//生成哈夫曼树
const root=buildHuffmanTree(characters,frequencies);//哈夫曼树的根节点

//编码
const codes = {};
generateHuffmanCodes(root, "", codes);

//送入huffmancode
const keys = Object.keys(codes);
for(let i=0;i<keys.length;i++){
  huffmancode.value.push({
    order:i+1,
    key:keys[i],
    code:codes[keys[i]]
  })
}



</script>
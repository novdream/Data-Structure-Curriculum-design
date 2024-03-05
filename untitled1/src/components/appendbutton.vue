<template>
  <div class="content">
    <div class="btn"><i>{{msg}}</i></div>
  </div>
</template>

<style>
.content{
  position: absolute;
  margin: 600px auto auto -112px;
  width: 255px;
  height: 30px;
  left:50%;
}
.btn{
  position: relative;
  color:white;
  border:1px solid black;
  background-size: 400%;
  background-image: linear-gradient(to left, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);
  border-radius: 40px;
  width: 250px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  cursor:pointer;
  z-index: 1;
}
.btn::before{
  content:'';
  position: absolute;
  top:-4px;
  left:-2px;
  width: 260px;
  height: 70px;
  background-size: 400%;
  border-radius: 40px;
  background-image: linear-gradient(to left, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);
  filter: blur(10px);
  z-index: -1;
}
.btn:hover{
  animation: flow 5s infinite;
}
.btn:hover::before{
  animation: flow 5s infinite;
}
@keyframes flow{
  100%{
    background-position:-400% 0;
  }
}
.content .btn i{
  color:black;
  font-size: larger;
}
</style>

<script setup>

const props=defineProps({
  msg:String
})
</script>
<template>
  <!--总界面-->
  <section v-if="show===1">
    <div class="introduce">部门信息</div>
    <el-table :data="tableData"  class="screen"  max-height="650">
      <el-table-column  prop="order" label="序号" width="100" />
      <el-table-column prop="name" label="部门" width="200" />
      <el-table-column prop="num" label="人数" width="100" />
      <el-table-column prop="leader" label="主管" width="150" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="Info(scope.$index)"
          >更多信息</el-button
          >
          <el-button
              size="small"
              type="danger"
              @click.prevent="deleteRow(scope.$index)"
          >删除</el-button
          >

        </template>
      </el-table-column>
    </el-table>

    <div v-if="choice===0" class="choice1">
      <el-button round @click="choice=1" >创建新部门</el-button>
      <el-button round @click="check" >添加新成员</el-button>
      <el-button round @click="check1">搜索成员信息</el-button>
    </div>

    <section v-if="choice===1">
      <el-input class="input1" v-model="input" placeholder="部门名称" />
      <el-button  class="create" size="small" type="primary" @click="sectionappend">创建新部门</el-button>
      <el-button class="create" size="small" type="primary" @click="choice=0;init_data()" style="left:45%;top:90%">返回</el-button>
    </section>
    <section v-else-if="choice===2">
      <div style="display: flex;position: absolute;top:85%;left:25%;width:800px">
        <el-select v-model="section_name" class="m-2" placeholder="选择部门" style="width: 500px;">
          <el-option
              v-for="item in tableData"
              :key="item.name"
              :label="item.label"
              :value="item.name"
          />
        </el-select>
        <el-input  v-model="input_name" placeholder="姓名" :maxlength="10" show-word-limit/>
        <el-input  v-model="input_position" placeholder="职位:比如主管、副主管" />
        <el-button   size="small" type="primary" style="height: 30px" @click="memberappend">添加新成员</el-button>
        <el-button class="create" size="small" type="primary" @click="choice=0;init_data()" style="left:45%;top:100%;margin-top: 20px">返回</el-button>
      </div>
    </section>
    <section v-else-if="choice===3">
      <el-input class="input1" v-model="search_name" placeholder="搜索名字" />
      <el-button  class="create" size="small" type="primary" style="width:70px" @click="SearchName">搜索</el-button>
      <el-button class="create" size="small" type="primary" @click="choice=0;init_data()" style="left:45%;top:90%">返回</el-button>
    </section>
  </section>
  <!--展示具体部门信息的部分-->
  <section v-else-if="show===2">
    <div class="introduce">{{choose_section}}部门的具体信息</div>
    <el-table :data="showdata"  class="screen"  max-height="650">
      <el-table-column  prop="order" label="序号" width="100" />
      <el-table-column prop="name" label="名字" width="300" />
      <el-table-column prop="position" label="职位"  />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
              size="small"
              type="danger"
              @click.prevent="delete_People(scope.$index)"
          >删除</el-button
          >

        </template>
      </el-table-column>
    </el-table>
    <el-button class="create" size="small" type="primary" @click="show=1;init_data()" style="left:50%">返回</el-button>
  </section>
  <!--展示具体的人的信息的部分-->
  <section v-else>
    <div class="introduce">{{search_name}}的所有部门职位</div>
    <el-table :data="infodata"  class="screen"  max-height="650">
      <el-table-column  prop="order" label="序号" width="200" />
      <el-table-column prop="section" label="部门" width="300" />
      <el-table-column prop="position" label="职位" />
    </el-table>
    <el-button class="create" size="small" type="primary" @click="show=1;init_data()" style="left:50%">返回</el-button>
  </section>

</template>

<style scoped>
.introduce{
  position: absolute;
  top:2%;
  left:16%;
  font-weight: bolder;
  font-size: 20px;
}
.choice1{
  position: absolute;
  top:85%;
  left:38%;
}
.screen{
  position: absolute;
  width:1000px;
  height: 650px;
  left:50%;
  margin: 50px auto auto -500px;
}
.input1{
  position: absolute;
  top:85%;
  left:35%;
  width: 350px;
  height: 30px;
}
 .create{
  position: absolute;
  top:85%;
  left:55%;
  height: 30px;
  z-index: 1;
}
</style>

<script lang="ts" setup>
import {ref} from 'vue'
import { ElMessage } from 'element-plus'
let choose_section=ref('');
let search_name=ref('')//搜索的名字
let section_name=ref('')//添加成员的部门名字
let input_name=ref('')//添加成员的名字
let input_position=ref('')//添加成员的职位
let show=ref(1);//界面和展示部门信息的转换
let choice=ref(0);//添加部门还是添加成员
let input = ref('')//添加部门的名字
const tableData=ref([]);//格式是order,name,num,leader,people:[]。people的格式：name,position
let showdata=ref([]);//格式order,name,postion
const peopledata=ref([]);//存储每个人的职位部门，格式是name,info(section,position)
const infodata=ref([]);//格式:order,section,position

//初始化各类输入数据
function init_data(){
  search_name.value=''
  section_name.value=''
  input_name.value=''
  input_position.value=''
  input.value=''
}

//删除某个人在特定的部门
const delete_People=(index:number)=>{
// 将peopledata中职位删去

  DeletePeople(showdata.value[index].name,choose_section.value)

// 将tabledata中poeple中删去
  let flag=-1
  for(let p=0;p<tableData.value.length;p++){
    if(tableData.value[p].name===choose_section.value){
      if(tableData.value[p].people.length===1){//该部门全部删去
        flag=p;
      }
      else{
        let pos=0;
        for(let i=0;i<tableData.value[p].people.length;i++){
          if(tableData.value[p].people[i].name===showdata.value[index].name){
            pos=i;
            break;
          }
        }
        //人数更新，主管更新
        --tableData.value[p].num
        if(tableData.value[p].leader===tableData.value[p].people[pos].name){//去除的是主管
          tableData.value[p].leader='无'
        }
        tableData.value[p].people.splice(pos,1)

      }
      break;
    }
  }
  if(flag>=0){
    tableData.value.splice(flag,1)
    for(let i=0;i<tableData.value.length;i++){
      tableData.value[i].order=i+1;
    }
  }
  ElMessage({
    message: '成员删除成功',
    type: 'success',
    duration:3000
  })

  //将showdata中的index删去
  showdata.value.splice(index, 1)
  for(let i=0;i<showdata.value.length;i++){
    showdata.value[i].order=i+1;
  }

}

//删除某部门
const deleteRow = (index: number) => {
  ElMessage({
    message: '成功删除'+tableData.value[index].name+'部门',
    type: 'success',
    duration:1000
  })


  // 需要同时把peopledata对应部门删去
  //如果那个人只有这一个部门，全删除
  for(let item of peopledata.value){
    for(let people of tableData.value[index].people){
      if(people.name===item.name){
          DeletePeople(people.name,tableData.value[index].name)
          break;
      }
    }
  }
  tableData.value.splice(index, 1)

  for(let i=0;i<tableData.value.length;i++){
    tableData.value[i].order=i+1;
  }
}

//添加新部门
function sectionappend(){
  const str=input.value.replace(/\s/g, "")//去除所有空格
  choice.value=0;
  input.value='';
  if(str===''){
    ElMessage.error('部门名字为空')
    return
  }
  for(let i=0;i<tableData.value.length;i++){
    if(str===tableData.value[i].name){
      ElMessage.error('已经存在'+str+'部门')
      return
    }
  }
tableData.value.push({
  order:tableData.value.length+1,
  name:str,
  num:0,
  leader:"无",
  people:ref([])
})
  ElMessage({
    message: '成功创建'+str+'部门',
    type: 'success',
    duration:1000
  })
}

//添加新成员
function memberappend(){
//section_name，input_name，input_position
  choice.value=0;
  //先检查该部门是否有这个人，没有才添加，有则提醒不添加
  const str_name=input_name.value.replace(/\s/g, "")
  const str_postion=input_position.value.replace(/\s/g, "")
  if(section_name.value===''||str_name===''||str_postion===''){
    ElMessage.error('添加成员信息有空，请填写完整')
    init_data();
    return
  }
  for(let item of tableData.value){
    if(item.name===section_name.value){
      if(str_postion==="主管"&&item.leader!=="无"){
        ElMessage.error('该部门已存在主管')
        init_data();
        return;
      }
      for(let p of item.people){
        if(p.name===str_name){
          ElMessage.error('该部门已存在'+str_name+',可以在'+section_name.value+'部门内查看')
          init_data();
          return ;
        }
      }
    }
  }
  //在peopledata中添加，在tableData下添加
  Addpeople(peopledata,str_name,section_name.value,str_postion)
  AddInSection(tableData,section_name.value,str_name,str_postion)
  ElMessage({
    message: '成功添加成员'+str_name+',部门:'+section_name.value+',职位:'+str_postion,
    type: 'success',
    duration:3000
  })
  init_data();
}
//将新成员添加入peopledata
function Addpeople(peopledata,name,section,position){
  let flag=false;
  for(let item of peopledata.value){
    if(item.name===name){
      flag=true;
      item.info.push({
        section:section,
        position:position
      })
      break;
    }
  }
  if(!flag){
    peopledata.value.push({
      name:name,
      info:[{
        section:section,
        position:position
      }]
    })
  }


}

//将新成员tableData
function AddInSection(tableData,section,name,position){
  for(let item of tableData.value){
    if(item.name===section){
      item.num++;
      if(position==="主管"){
        item.leader=name;
      }
      item.people.push({
        name:name,
        position:position
      })
      break;
    }
  }
}

//同步更新数据，删除peopledata中section部门的name
function DeletePeople(name,section){
  let index;
  let flag=false;
  for(let k=0;k< peopledata.value.length;k++){
    if(name===peopledata.value[k].name){
      if(peopledata.value[k].info.length===1){
        index=k;
        flag=true;
      }
      if(flag){
        peopledata.value.splice(index,1);
        break;
      }
      for(let i=0;i<peopledata.value[k].info.length;i++){              //注意一下info.value?
        if(peopledata.value[k].info[i].section===section){
          index=i;
          break;
        }
      }
      peopledata.value[k].info.splice(index,1);
      break;
    }
  }
}

//展示部门的人员
function Info(index){
  choose_section.value= tableData.value[index].name;
  show.value=2;
  showdata.value=[];
  for(let item of tableData.value[index].people){
    showdata.value.push({
      order:showdata.value.length+1,
      name:item.name,
      position:item.position
    })
  }
}
//能否添加成员的判断
function check(){
  if(tableData.value.length===0){
    ElMessage.error('现在没有部门，请先添加部门')
    return
  }
  choice.value=2;
}

function check1(){
  if(peopledata.value.length===0){
    ElMessage.error('现在没有任何成员，请先添加成员')
    return
  }
  choice.value=3;
}
//peopledata查找成员的部门和职位

function SearchName(){
  infodata.value=[];
  let flag=false;
  for(let item of peopledata.value){
    if(item.name===search_name.value){
      flag=true;
      for(let p of item.info){
        infodata.value.push({
          order:infodata.value.length+1,
          section:p.section,
          position:p.position
        })
      }
      break;
    }
  }

  if(!flag){
    ElMessage.error('查无此人')
    show.value=1;
    return;
  }
  show.value=3;
}

</script>

<template>

  <svg ref="svg"  :viewBox="viewBox" style="width:850px; height:700px;border-radius:4px;position: absolute;top:10%;left:30%;background: rgba(255,255,255,0.6)"></svg>

  <h5 id="info">可通过键盘左右键以及鼠标滑轮调节哈夫曼树画面</h5>
</template>

<style>

#info{
  position: absolute;
  top:3%;left:30%;
}
</style>
<script setup>
import {ref,onMounted } from 'vue'
const props=defineProps({
  root:{}
});
let final_depth=0;
const viewBox = ref('0 0 1000 600');
const scaleFactor = 1.1; // 缩放比例
const step = 10; // 每次按键移动的距离

//求哈夫曼深度
function maxdepth(data,cur_depth){
  if(data===null){
    if(cur_depth-1>final_depth)
      final_depth=cur_depth;
    return
  }
  maxdepth(data.left,cur_depth+1)
  maxdepth(data.right,cur_depth+1)
}
maxdepth(props.root,0);

const svg = ref(null);
let svgNS;
onMounted(() => {
  const svgElement = svg.value;
  svgNS = svgElement.namespaceURI;
  svg.value.addEventListener('wheel', handleWheel);
  document.addEventListener('keydown', handleKeyDown);
  drawTree(props.root, 850/ 2, 50, final_depth);
});

function handleWheel(e){
  e.preventDefault();
  const delta = -Math.sign(e.deltaY); // 根据滚轮滚动方向判断缩放方向

  // 解析当前的viewBox值
  const [x, y, width, height] = viewBox.value.split(' ').map(parseFloat);

  // 根据delta的正负来判断是放大还是缩小
  const newWidth = delta > 0 ? width / scaleFactor : width * scaleFactor;
  const newHeight = delta > 0 ? height / scaleFactor : height * scaleFactor;

  // 计算新的viewBox值
  const newViewBox = `${x} ${y} ${newWidth} ${newHeight}`;

  // 更新viewBox的值
  viewBox.value = newViewBox;
}
function handleKeyDown(e) {
  // 解析当前的viewBox值
  const [x, y, width, height] = viewBox.value.split(' ').map(parseFloat);

  switch (e.key) {
    case 'ArrowLeft':
      viewBox.value = `${x - step} ${y} ${width} ${height}`;
      break;
    case 'ArrowRight':
      viewBox.value = `${x + step} ${y} ${width} ${height}`;
      break;
  }
}

function drawTree(node, x, y, level) {
  const svgElement = svg.value;
  // const svgNS = svgElement.namespaceURI;

  if (!node) return;

  const circle = createCircle(x, y);
  if(node.left===null&&node.right===null)
    circle.setAttribute('fill', 'orange');
  svgElement.appendChild(circle);
  const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
  textElement.textContent = node.priority;
  textElement.setAttribute("x", x);
  textElement.setAttribute("y", y);
  textElement.setAttribute("text-anchor", "middle");
  textElement.setAttribute("alignment-baseline", "middle");

  // 将文本元素添加到 SVG 中
  svgElement.appendChild(textElement);
  if (node.left) {
    const leftX = x - 3*Math.pow(2, level);
    const leftY = y + 600/final_depth;
    const line = createLine(x, y+10, leftX, leftY);
    svgElement.appendChild(line);
    drawTree(node.left, leftX, leftY, level - 1);
  }

  if (node.right) {
    const rightX = x + 3*Math.pow(2, level);
    const rightY = y + 600/final_depth;
    const line = createLine(x, y+10, rightX, rightY);
    svgElement.appendChild(line);
    drawTree(node.right, rightX, rightY, level - 1);
  }
}

function createCircle(cx, cy) {
  const circle = document.createElementNS(svgNS, 'circle');
  circle.setAttribute('cx', cx);
  circle.setAttribute('cy', cy);
  circle.setAttribute('r', 10);
  circle.setAttribute('fill', 'lightblue');
  return circle;
}

function createLine(x1, y1, x2, y2) {
  const line = document.createElementNS(svgNS, 'line');
  line.setAttribute('x1', x1);
  line.setAttribute('y1', y1);
  line.setAttribute('x2', x2);
  line.setAttribute('y2', y2);
  line.setAttribute('stroke', 'black');
  return line;
}


</script>
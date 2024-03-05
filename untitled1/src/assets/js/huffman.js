// 定义优先队列节点类
class PriorityQueueNode {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
    }
}

// 定义优先队列类
class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(data, priority) {
        const newNode = new PriorityQueueNode(data, priority);
        let added = false;

        // 遍历队列，按照优先级插入节点
        for (let i = 0; i < this.queue.length; i++) {
            if (newNode.priority < this.queue[i].priority) {
                this.queue.splice(i, 0, newNode);
                added = true;
                break;
            }
        }

        // 如果新节点优先级最大，将其插入队列末尾
        if (!added) {
            this.queue.push(newNode);
        }
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.queue.shift().data;
    }

    front() {
        if (this.isEmpty()) {
            return null;
        }
        return this.queue[0].data;
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    size() {
        return this.queue.length;
    }
}

// 构建哈夫曼树
export function buildHuffmanTree(data, freq) {
    const pq = new PriorityQueue();

    // 将每个字符和其频率作为节点插入优先队列
    for (let i = 0; i < data.length; i++) {
        const node = new HuffmanNode(data[i], freq[i]);
        pq.enqueue(node, freq[i]);
        // console.log(pq)
    }

    //构建哈夫曼树
    while (pq.size() > 1) {
        const leftNode = pq.dequeue();
        const rightNode = pq.dequeue();
        const parentNode = new HuffmanNode(leftNode, leftNode.priority+rightNode.priority);
        parentNode.left=leftNode;
        parentNode.right=rightNode;
        pq.enqueue(parentNode, leftNode.priority + rightNode.priority);
    }

    // 返回根节点
    return pq.dequeue();
}

// 定义哈夫曼树节点类
class HuffmanNode {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
        this.left = null;
        this.right = null;
    }
}

// 生成哈夫曼编码表
export function generateHuffmanCodes(root, currentCode, codes) {
    // 如果节点是叶子节点，则将其数据与对应的编码存入编码表
    if (root.left===null&& root.right===null) {
        codes[root.data] = currentCode;
    }
    else {
        generateHuffmanCodes(root.left, currentCode + "0", codes);
        generateHuffmanCodes(root.right, currentCode + "1", codes);
    }
}


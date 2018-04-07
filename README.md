# js实现一个区块链  
* 区块链究竟为何物？
> 高速公路堵车,如果车都只能排成一条线，拿出一条很窄的车道看，车车要是看做是方块的话，这就是区块，拿根绳子绑一块就是链了。没毛病  

如果是区跨链小白并对其有深入了解的欲望，推荐《白话区块链》。   

本节探讨js实现一个区块链；  
首先区块链的特点：
  > 1. 数据的完整性:
  > 2. 信息不可篡改；

基于区跨链原理我们大致构想区块创建应该是这样：  
```javascript

const SHA256 = require("crypto-js/sha256");
// 创建一个区块
function Block(index, date = Date.parse(new Date()), preHash = '', ) {
  this.preHash = preHash; // 当前区块保存上一个区块的hash，这样就保证数据完整性
  this.date = date; // 日期，默认为时间戳
  this.index = index; // 既然是区块的链条，想当然应该有个index
  this.hash = this.calculateHash(); // 我理解的此处的hash就是数据的加密，
}

Block.prototype.calculateHash = function(){
  return SHA256((this.preHash + this.date).toString())
}
```
简单构想下区块内容，应该长这样儿。  data属性肯定会有，后面会添加，不急先把骨架搭起来。  
区块有了，链还远吗？
```javascript
BlockChain.prototype = {
  constructor: BlockChain,
  createGenesisBlock: function() {
    return new Block(0, "2018/04/07", 'firstHash')
  }, // 创世区块创建
  getLatestBlock: function() {
    return this.chain[this.chain.length - 1]
  },
  addNewBlock: function(newBlock) {
    newBlock.preHash = this.getLatestBlock().hash;
    this.chain.push(newBlock)
  },
  isChainValid: function() {
    for (let i = 1; i < this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.preHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}
```  
保证数据不可篡改性，我们引入isChainValid方法，对其hash进行比较。  今天先到这儿，有点困先睡~
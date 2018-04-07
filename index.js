 

const SHA256 = require("crypto-js/sha256");
// 创建一个区块
function Block(index, date = Date.parse(new Date()), preHash = '', ) {
  this.preHash = preHash;
  this.date = date;
  this.index = index;
  this.hash = this.calculateHash()
}

Block.prototype.calculateHash = function(){
  return SHA256((this.preHash + this.date).toString())
}

// 创建一个链
function BlockChain () {
  this.chain = [this.createGenesisBlock()];
}

BlockChain.prototype = {
  constructor: BlockChain,
  createGenesisBlock: function() {
    return new Block(0, "2018/04/07", 'firstHash')
  },
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


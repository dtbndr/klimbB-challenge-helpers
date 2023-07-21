/**
 * Transaction represents a transfer of value from one address to another.
 * In this simplified scenario, a transaction has a single recipient.
 */
class Transaction {
    constructor(
      public fromAddress: string | null,
      public toAddress: string,
      public amount: number
    ) {}
  }
  
  /**
   * Block represents a set of transactions.
   * In this simplified scenario, a block contains a single transaction.
   */
  class Block {
    public nonce = Math.round(Math.random() * 999999999);
  
    constructor(
      public prevHash: string,
      public transaction: Transaction,
      public timestamp = Date.now()
    ) {}
  
    /**
     * Generates a simple hash for the block data.
     * In a real blockchain, a more secure method would be used.
     */
    get hash() {
      const str = JSON.stringify(this);
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash += str.charCodeAt(i);
      }
      return hash.toString();
    }
  }
  
  /**
   * Blockchain represents a chain of blocks, with methods for adding blocks
   * and checking the integrity of the chain.
   */
  class Blockchain {
    public chain: Block[];
  
    constructor() {
      this.chain = [this.createGenesisBlock()];
    }
  
    /**
     * Create the initial block for the blockchain.
     */
    private createGenesisBlock() {
      return new Block("", new Transaction(null, "", 0));
    }
  
    /**
     * Get the latest block in the chain.
     */
    private get latestBlock() {
      return this.chain[this.chain.length - 1];
    }
  
    /**
     * Add a new transaction to the blockchain. The transaction is placed in a new block.
     */
    public addTransaction(transaction: Transaction) {
      const newBlock = new Block(
        this.latestBlock.hash,
        transaction,
        Date.now()
      );
      this.chain.push(newBlock);
    }
  
    /**
     * Get the balance of an address by aggregating the amounts in the related transactions.
     */
    public getBalance(address: string) {
      let balance = 0;
      for (const block of this.chain) {
        const { fromAddress, toAddress, amount } = block.transaction;
        if (fromAddress === address) {
          balance -= amount;
        }
        if (toAddress === address) {
          balance += amount;
        }
      }
      return balance;
    }
  }
  
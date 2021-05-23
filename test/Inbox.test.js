const assert = require ('assert');
const ganache = require ('ganache-cli');
const Web3 = require ('web3');
const web3 = new Web3(ganache.provider());
const {interface,bytecode} = require('../compile');

let accounts;
let inbox;

beforeEach(async()=>{
    //Get a list of all accounts
  accounts = await web3.eth.getAccounts();
   //the contract
   inbox = await new web3.eth.Contract(JSON.parse(interface))
   .deploy({data:bytecode,arguments:['Hi there!']})
   .send({from:accounts[0],gas:'1000000'});


})
describe("Inbox",()=>{
    // it("shows the available addresses",()=>
    // {
    //     console.log(accounts);
    // })
    // it("shows the contract",()=>
    // {
    //     console.log(inbox);
    // })
    it("deploys a contract",()=>
    {
        assert.ok(inbox.options.address);
        
    })
    it("intial message check",async ()=>
    {
        const message = await inbox.methods.message().call();
        assert.strictEqual(message,'Hi there!');
    })
    it("change message check",async ()=>
    {
        await inbox.methods.setMessage('General Kenobi').send({from:accounts[0]});
        const message = await inbox.methods.message().call();
        assert.strictEqual(message,'General Kenobi');
    })
})
const walletProvider =  require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {interface,bytecode} = require('./compile');
const provider =  new walletProvider(
    'peanut simple case bean pink urge laugh save gaze detect urge afford',
    'https://ropsten.infura.io/v3/514b5a62b41d432dae8e77cf8cb97b69'
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode,arguments:['Deployed on the testnet']})
    .send({gas:'1000000',from:accounts[0]})

    console.log("address used ",accounts[0]);
    console.log('contract deployed to ',result.options.address);
}

deploy();
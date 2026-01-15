require("dotenv").config();
const Web3 = require("web3");
const fs = require("fs");
const path = require("path");

const web3 = new Web3("http://127.0.0.1:7545");

const contractPath = path.resolve(__dirname, "build", "EventTicket.json");
const contractJSON = JSON.parse(fs.readFileSync(contractPath, "utf8"));

const abi = contractJSON.abi;
const bytecode = contractJSON.evm.bytecode.object;

async function deploy() {
  const accounts = await web3.eth.getAccounts();
  console.log("Deploying from:", accounts[0]);

  const contract = new web3.eth.Contract(abi);

  const deployed = await contract.deploy({
    data: bytecode
  }).send({
    from: accounts[0],
    gas: 4000000
  });

  console.log("✅ Contract deployed at:", deployed.options.address);
}

deploy();

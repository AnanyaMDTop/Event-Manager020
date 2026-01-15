const path = require("path");
const fs = require("fs");
const solc = require("solc");

const contractPath = path.resolve(__dirname, "..", "contracts", "EventTicket.sol");
const source = fs.readFileSync(contractPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "EventTicket.sol": {
      content: source
    }
  },
  settings: {
    evmVersion: "istanbul",   // ⭐ CRITICAL FIX
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode"]
      }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

if (output.errors) {
  output.errors.forEach(err => console.log(err.formattedMessage));
}

const contract = output.contracts["EventTicket.sol"]["EventTicket"];

const buildPath = path.resolve(__dirname, "build");
if (!fs.existsSync(buildPath)) fs.mkdirSync(buildPath);

fs.writeFileSync(
  path.resolve(buildPath, "EventTicket.json"),
  JSON.stringify(contract, null, 2)
);

console.log("✅ Contract compiled with Istanbul EVM");

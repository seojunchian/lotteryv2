const {Web3} = require("web3");
const {abi, bytecode} = require("../out/TwentyOne.sol/TwentyOne.json");
require("dotenv").config();

async function main() {
	const web3 = new Web3(
		new Web3.providers.HttpProvider(process.env.SEPOLIA_API)
	);

	const signer = web3.eth.accounts.privateKeyToAccount(
		process.env.SENDER_PRIVATE_KEY
	);
	web3.eth.accounts.wallet.add(signer);

	const account2 = web3.eth.accounts.privateKeyToAccount(
		process.env.ACCOUNT2_PRIVATE_KEY
	);
	web3.eth.accounts.wallet.add(account2);

	const account3 = web3.eth.accounts.privateKeyToAccount(
		process.env.ACCOUNT3_PRIVATE_KEY
	);
	web3.eth.accounts.wallet.add(account3);

	const contract = new web3.eth.Contract(
		abi,
		"0xa939128Bfb587d0Ab02c5806bF63F95941D013C1"
	);
	contract.options.data = bytecode.object;
	contract.handleRevert = true;

	const createContest = contract.methods.twentyOneContests(0);
	createContest.call({from: signer.address}).then(console.log);
}

main().catch((err) => {
	console.log(err);
});

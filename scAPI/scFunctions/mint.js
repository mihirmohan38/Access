const {zilliqa, address, config} = require("../zil_wallet/zil") ;

module.exports = async function mint(SCAddress, toAddress, tokenURI) {

    const nftAddr = toBech32Address(SCAddress)//("79d662e621c08521a20f80e953417d981ddef0a6");
    try {
        const contract = zilliqa.contracts.at(nftAddr);
        const callTx = await contract.callWithoutConfirm(
            'mint',
            [
                {
                    vname: 'to',
                    type: 'ByStr20',
                    value: `${toAddress}`,
                },
                {
                    vname: 'token_uri',
                    type: 'String',
                    value: `${tokenURI}`,
                }
            ],
            {
                // amount, gasPrice and gasLimit must be explicitly provided
                version: config["version"],
                amount: new BN(0),
                gasPrice: config["gasPrice"],
                gasLimit: config["gasLimit"],
            }
        );

        // check the pending status
        const pendingStatus = await zilliqa.blockchain.getPendingTxn(callTx.id);
        console.log(`Pending status is: `);
        console.log(pendingStatus.result);

        // process confirm
        console.log(`The transaction id is:`, callTx.id);
        console.log(`Waiting transaction be confirmed`);
        const confirmedTxn = await callTx.confirm(callTx.id);

        console.log(`The transaction status is:`);
        console.log(confirmedTxn.receipt);

    } catch (err) {
        console.log(err);
        return null
    }
}

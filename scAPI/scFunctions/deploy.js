// const fs = require('fs');
// const {Long, bytes, units} = require('@zilliqa-js/util');
// const {Zilliqa} = require('@zilliqa-js/zilliqa');
// const {getAddressFromPrivateKey} = require('@zilliqa-js/crypto');

//const zilliqa = new Zilliqa('https://dev-api.zilliqa.com');

const {zilliqa, address, config} = require("../zil_wallet/zil") ; 

module.exports = async function deploySmartContract(code, init){
    const contract = zilliqa.contracts.new(code, init);  

     try {
        // const [deployTx, nft] = await contract.deployWithoutConfirm({
        //     version: config["version"],
        //     gasPrice: config["gasPrice"],
        //     gasLimit: config["gasLimit"]
        // }, false);

        // if (nft.error) {
        //     console.error(nft.error);
        //     return;
        // }
        // // check the pending status
        // const pendingStatus = await zilliqa.blockchain.getPendingTxn(deployTx.id);
        // console.log(`Pending status is: `);
        // console.log(pendingStatus.result);

        const [deployTx, nft] = await contract.deploy(
      {
            version: config["version"],
            gasPrice: config["gasPrice"],
            gasLimit: config["gasLimit"]
      },
      33,
      1000,
      false,
    );

        // process confirm
        console.log(`The transaction id is:`, deployTx.id);
        console.log(`Waiting transaction be confirmed`);
        const confirmedTxn = await deployTx.confirm(deployTx.id);
        console.log(nft.address) ; 
        return confirmedTxn ; 

        // Introspect the state of the underlying transaction
        console.log(`Deployment Transaction ID: ${deployTx.id}`);

        // Get the deployed contract address
        console.log("The contract address is:");
        console.log(nft.address);
    } catch (e) {
        console.error(e);
        return null ; 
    }

}


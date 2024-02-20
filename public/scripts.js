async function checkAddress() {
    var address = document.getElementById("solanaAddress").value.trim();
    var resultMessage = document.getElementById("resultMessage");
    var loadingImage = document.getElementById("loadingImage");


    // Initialize a connection to the Solana mainnet
    const connection = new solanaWeb3.Connection(
        solanaWeb3.clusterApiUrl('devnet')
    );

    try {
        // Fetch account information for the provided address
        const accountInfo = await connection.getAccountInfo(
            new solanaWeb3.PublicKey(address)
        );

        // If accountInfo is null, the address does not exist on the mainnet
        if (accountInfo === null) {
            resultMessage.innerText = "Solana address does not exist on the mainnet.";
        } else {
            const balance = accountInfo.lamports / solanaWeb3.LAMPORTS_PER_SOL;
            balanceMessage.innerText = `Balance of ${balance} SOL`;
            resultMessage.innerText = "Solana address exists on the mainnet.";
            loadingImage.style.display = "block";

        }
    } catch (error) {
        console.error("Error occurred while checking Solana address:", error);
        resultMessage.innerText = "Error occurred while checking Solana address. See console for details.";
    }
}
// scripts/check-network.js
async function main() {
  const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);
  const network = await provider.getNetwork();
  console.log(`Connected to network: ${network.name} (${network.chainId})`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

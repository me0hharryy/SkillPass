import { ethers } from 'ethers';
import abiFile from './SkillPassABI.json';
const abi = abiFile.abi;

const contractAddress = '0x470c12bfd8e06DceFe9bf61FEd86c459D27a185E';

export const mintSkillNFT = async (tokenURI) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.mintSkill(await signer.getAddress(), tokenURI);
    await tx.wait();
};

export const fetchNFTs = async (ownerAddress) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const tokenIds = await contract.getTokensByOwner(ownerAddress);

    console.log("🧪 Fetching tokens for:", ownerAddress);
    console.log("🎯 Tokens found:", tokenIds);

    const nfts = await Promise.all(
        tokenIds.map(async (tokenId) => {
            const owner = await contract.ownerOf(tokenId).catch(() => null);
            if (!owner || owner.toLowerCase() !== ownerAddress.toLowerCase()) return null;

            const tokenURI = await contract.tokenURI(tokenId);
            console.log("🧾 Token URI for", tokenId.toString(), ":", tokenURI);
            const gatewayURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
            console.log("🌐 Fetching from:", gatewayURL);
            let metadata;
            try {
                const response = await fetch(gatewayURL);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                metadata = await response.json();

                if (metadata.image?.startsWith("ipfs://")) {
                    metadata.image = metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/");
                }

                // Support PDF display
                if (metadata.image?.endsWith(".pdf")) {
                    metadata.isPDF = true;
                }
            } catch (error) {
                console.error(`❌ Failed to fetch metadata for token ${tokenId}:`, error);
                metadata = {
                    name: `Token ${tokenId.toString()}`,
                    description: "Failed to load metadata.",
                    image: "https://via.placeholder.com/150?text=No+Image"
                };
            }
            console.log("📦 Metadata:", metadata);
            return metadata;
        })
    ).then(results => results.filter(nft => nft !== null));

    return nfts;
};

import { ethers } from 'ethers';
import abi from './SkillPassABI.json';

const contractAddress = '0xA4E8C7B4F2eA6bF45d61675A973399B83dc6F54c';

export const mintSkillNFT = async (tokenURI) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.mintSkill(tokenURI);
    await tx.wait();
};

export const fetchNFTs = async (ownerAddress) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const balance = await contract.balanceOf(ownerAddress);

    const nfts = [];
    for (let i = 0; i < balance; i++) {
        const tokenId = await contract.tokenOfOwnerByIndex(ownerAddress, i);
        const tokenURI = await contract.tokenURI(tokenId);
        const metadata = await fetch(tokenURI).then(res => res.json());
        nfts.push(metadata);
    }
    return nfts;
};
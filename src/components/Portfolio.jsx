import React, { useEffect, useState } from 'react';
import { fetchNFTs } from '../utils/contract';

const Portfolio = ({ account }) => {
    const [nfts, setNfts] = useState([]);

    useEffect(() => {
        const loadNFTs = async () => {
        const data = await fetchNFTs(account);
        setNfts(data);
        };
        loadNFTs();
    }, [account]);

    return (
        <div className="bg-gray-800 p-6 rounded">
        <h2 className="text-xl mb-4">My SkillPass Credentials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nfts.map((nft, i) => (
            <div key={i} className="border border-gray-700 p-4 rounded">
            <img src={nft.image} alt="Skill NFT" className="w-full h-48 object-cover rounded" />
            <h3 className="text-lg mt-2 font-semibold">{nft.name}</h3>
            <p>{nft.description}</p>
            </div>
        ))}
        </div>
    </div>
    );
};

export default Portfolio;
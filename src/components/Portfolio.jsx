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
        <div className="bg-gray-800 min-h-screen w-screen p-6 m-0">
        <h2 className="text-xl mb-4" style={{
            margin: '10px',
            marginBottom: '30px',
        }}>My SkillPass Credentials</h2>
        <div className="flex flex-wrap gap-6 justify-center" style={{
            padding: '10px',
        }}>
            {nfts.map((nft, i) => (
            <div key={i} className="flex justify-center" style={{
                border: '1px solid #bcbcbc',
                borderRadius: '15px',
                padding: '20px',
                marginBottom: '20px',
            }}>
              <div className="bg-gray-700 bg-opacity-20 p-4 rounded-lg shadow-md flex flex-col items-center text-white w-44">
                <img
                  src={nft.image}
                  alt="Skill NFT"
                  className="w-32 h-32 object-cover rounded-md mb-3"
                  style={{
                    height: '400px',
                    width: '500px',
                    borderRadius: '15px',
                  }}
                />
                <h3 className="text-md font-bold text-center">{nft.name}</h3>
                <p className="text-sm text-center" style={{margin:'10px', marginBottom:'30px'}}>{nft.description}</p>
              </div>
            </div>
        ))}
        </div>
    </div>
    );
};

export default Portfolio;
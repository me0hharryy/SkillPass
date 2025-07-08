import React, { useState } from 'react';
import { uploadToIPFS } from '../utils/ipfs';
import { mintSkillNFT } from '../utils/contract';

const CredentialForm = ({ account }) => {
    const [form, setForm] = useState({ name: '', skill: '', description: '', image: null });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const metadataUrl = await uploadToIPFS(form);
        await mintSkillNFT(metadataUrl);
        alert('SkillPass NFT Minted!');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded mb-6">
            <h2 className="text-xl mb-4">New Skill Credential</h2>
            <input type="text" placeholder="Name" className="input" onChange={e => setForm({ ...form, name: e.target.value })} required />
            <input type="text" placeholder="Skill" className="input" onChange={e => setForm({ ...form, skill: e.target.value })} required />
            <textarea placeholder="Description" className="input" onChange={e => setForm({ ...form, description: e.target.value })} required></textarea>
            < input type="file" className="input" onChange={e => setForm({ ...form, image: e.target.files[0] })} />
            <button type="submit" className="bg-yellow-400 text-black px-4 py-2 mt-2 rounded">Mint Skill NFT</button>
        </form>
    );
};

export default CredentialForm;

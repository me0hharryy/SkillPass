import React, { useState } from 'react';
import { uploadToIPFS } from '../utils/ipfs';
import { mintSkillNFT } from '../utils/contract';

const CONTRACT_ADDRESS = '0xebaE55f97598fBD36aF0fCAAF62e5ADc2fe96462';

const CredentialForm = ({ account }) => {
  const [form, setForm] = useState({ name: '', skill: '', description: '', image: null });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!account) {
      alert('Please connect your wallet first.');
      return;
    }

    console.log('Form submitted:', form);
    if (!form.image) {
      console.error('No image file found.');
      alert('Please upload an image file.');
      return;
    }
    // Log file object before passing to IPFS
    console.log('File object before IPFS upload:', form.image);

    setLoading(true);
    try {
      console.log('Uploading metadata to IPFS...');
      const metadataUrl = await uploadToIPFS(form);
      console.log('Metadata uploaded to IPFS at:', metadataUrl);

      console.log('Calling smart contract to mint NFT...');
      await mintSkillNFT(metadataUrl, CONTRACT_ADDRESS);
      console.log('NFT minted successfully.');

      alert('✅ SkillPass NFT Minted!');
      setForm({ name: '', skill: '', description: '', image: null });
    } catch (error) {
      console.error('Minting failed:', error);
      alert('❌ Minting failed. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
      <h2 className="text-2xl font-bold text-[grey] mb-4">New Skill Credential</h2>

      <input
        type="text"
        placeholder="Name"
        className="bg-transparent border-b border-gray-500 text-white p-2 focus:outline-none"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Skill"
        className="bg-transparent border-b border-gray-500 text-white p-2 focus:outline-none"
        value={form.skill}
        onChange={e => setForm({ ...form, skill: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        className="bg-transparent border-b border-gray-500 text-white p-2 focus:outline-none"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
        required
      ></textarea>
      <input
        type="file"
        className="bg-transparent border-b border-gray-500 text-white p-2 focus:outline-none"
        onChange={e => setForm({ ...form, image: e.target.files[0] })}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-white text-black px-4 py-2 rounded border border-gray-400 hover:bg-gray-200 transition"
      >
        {loading ? 'Minting...' : '🎨 Mint Skill NFT'}
      </button>
    </form>
  );
};

export default CredentialForm;

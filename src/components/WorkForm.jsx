import React, { useState } from 'react';
import { ethers } from 'ethers';
import WorkHistoryABI from '../utils/WorkHistoryABI.json';

const CONTRACT_ADDRESS = '0x2194aA149CAbA2363702f2FCcE39A9ce90814b2e'; 
const WorkForm = ({ account }) => {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, WorkHistoryABI, signer);

            const tx = await contract.addWork(
            formData.title,
            formData.description,
            formData.company
            );
        await tx.wait();

        alert('✅ Work history added!');
        setFormData({ title: '', company: '', description: '' });
        } catch (err) {
            console.error(err);
            alert('❌ Error adding work');
        } finally {
        setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-[#A64D79] mb-4">New Work Entry</h2>

          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Job Title"
            className="bg-[#1A1A1D] text-white border border-[#6A1E55] p-3 rounded-lg w-full"
            required
          />

          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company"
            className="bg-[#1A1A1D] text-white border border-[#6A1E55] p-3 rounded-lg w-full"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Job Description"
            className="bg-[#1A1A1D] text-white border border-[#6A1E55] p-3 rounded-lg w-full"
            required
          />

          <button
            type="submit"
            className="bg-[#A64D79] hover:bg-[#6A1E55] text-white font-semibold px-6 py-2 rounded-lg"
            disabled={loading}
          >
            {loading ? 'Adding...' : '💼 Add Work Entry'}
          </button>
        </form>
    );
};

export default WorkForm;
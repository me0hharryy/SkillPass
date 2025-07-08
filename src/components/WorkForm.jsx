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
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded mb-6">
        <h2 className="text-xl font-semibold mb-4">Add Work History</h2>

        <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Job Title"
            className="input mb-2 w-full"
            required
        />
        <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company"
            className="input mb-2 w-full"
            required
        />
        <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Job Description"
            className="input mb-2 w-full"
            required
        />

        <button
            type="submit"
            className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300"
            disabled={loading}
        >
            {loading ? 'Adding...' : 'Add Work Entry'}
        </button>
        </form>
    );
};

export default WorkForm;
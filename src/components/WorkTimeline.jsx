import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import WorkHistoryABI from '../utils/WorkHistoryABI.json';

const CONTRACT_ADDRESS = '0x2194aA149CAbA2363702f2FCcE39A9ce90814b2e'; // 🔁 Replace with your deployed address

const WorkTimeline = ({ account }) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWorkHistory = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, WorkHistoryABI, provider);
      const data = await contract.getWorkHistory(account);

      const parsed = data.map(entry => ({
        title: entry.title,
        company: entry.company,
        description: entry.description,
        timestamp: new Date(Number(entry.timestamp) * 1000).toLocaleString()
      }));

      setEntries(parsed.reverse());
    } catch (error) {
      console.error("Failed to load work history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (account) fetchWorkHistory();
  }, [account]);

  return (
    <div className="bg-gray-800 p-6 rounded mb-6">
      <h2 className="text-xl font-semibold mb-4">📜 Work History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : entries.length === 0 ? (
        <p>No work history found.</p>
      ) : (
        <div className="space-y-4">
          {entries.map((entry, idx) => (
            <div key={idx} className="border-l-4 border-yellow-400 pl-4">
              <h3 className="text-lg font-bold">{entry.title}</h3>
              <p className="text-sm text-yellow-200">{entry.company}</p>
              <p className="text-sm text-gray-300 italic">{entry.timestamp}</p>
              <p className="mt-1 text-gray-200">{entry.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkTimeline;
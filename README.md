
# 🧠 SkillPass – Decentralized Proof-of-Skill & Work History

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Tech](https://img.shields.io/badge/Built%20With-React%20%2B%20Solidity%20%2B%20Hardhat-blue)
![Network](https://img.shields.io/badge/Deployed%20on-Sepolia%20Testnet-purple)

> 🪪 A fully decentralized portfolio that proves your skills & work history on-chain — powered by Soulbound NFTs and verified smart records.

---

## 🚀 Overview

**SkillPass** empowers freelancers, students, and professionals to:
- 🧠 Mint **Soulbound Skill NFTs** (non-transferable credentials)
- 🏢 Log **Work History entries** (verifiable and public)
- 🧾 Build a fully portable, transparent on-chain resume

---

## 🎯 Features

| Feature                 | Description |
|------------------------|-------------|
| 🦊 Wallet Login        | Connect via Metamask (Sepolia) |
| 🎓 Skill NFTs          | Soulbound ERC721 tokens for each skill |
| 🗂 Work History         | Add & view job experience on-chain |
| 🌐 IPFS Storage         | Upload metadata using NFT.storage |
| 🛡️ Client Verification (coming) | Allow employers to sign/verify entries |

---

## 🛠 Tech Stack

- **Frontend**: React.js + Tailwind CSS
- **Smart Contracts**: Solidity (ERC721 Soulbound + Storage)
- **Blockchain**: Ethereum Sepolia Testnet
- **Storage**: IPFS (via NFT.storage)
- **Web3**: ethers.js v6 + Metamask

---

## 🧱 Contracts

| Contract       | Purpose        | Status |
|----------------|----------------|--------|
| `SkillPassNFT` | Mint skill NFTs | ✅ Deployed |
| `WorkHistory`  | Store job records | ✅ Deployed |

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/your-username/skillpass.git
cd skillpass
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Up Environment

Create a `.env` file:

```env
PRIVATE_KEY=your_wallet_private_key
SEPOLIA_RPC_URL=https://rpc.sepolia.org
NFT_STORAGE_KEY=your_nft_storage_key
```

---

## 🧪 Deploy Contracts (Optional)

```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
npx hardhat run scripts/deployWork.js --network sepolia
```

---

## 🖥️ Run the Frontend

```bash
npm start
```

Then open: [http://localhost:3000](http://localhost:3000)

---

## 📸 Screenshots

| Mint Skill NFT | View Portfolio | Work Timeline |
|----------------|----------------|----------------|
| ![mint](https://via.placeholder.com/250x140) | ![portfolio](https://via.placeholder.com/250x140) | ![timeline](https://via.placeholder.com/250x140) |

---

## 🌍 Future Enhancements

- ✅ Client signature for verified work
- 📜 Export resume as PDF
- 🔗 Share wallet-based profile via QR
- 🧠 ZK-Proofs for private work history

---

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first.

---

## 🧑‍💻 Made By

- 👨‍💻 Big O (@the.rusted.monarchy)
- ⚡ Harshpreet Singh, Ashutosh, Madhav, Leeza

---

## 📜 License

This project is licensed under the MIT License.

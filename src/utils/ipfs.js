import { NFTStorage, File } from 'nft.storage';

console.log('NFT_STORAGE_KEY:', import.meta.env.VITE_NFT_STORAGE_KEY);

const client = new NFTStorage({ token: import.meta.env.VITE_NFT_STORAGE_KEY });

export async function uploadToIPFS({ name, skill, description, image }) {
    const metadata = await client.store({
        name: `${name} – ${skill}`,
        description,
        image: new File([image], image.name, { type: image.type })
    });
    return metadata.url;
}
import { NFTStorage, File } from 'nft.storage';

const client = new NFTStorage({ token: '4c397fdd.5e75092215ee49d791769afc3d4766c6' });

export async function uploadToIPFS({ name, skill, description, image }) {
    const metadata = await client.store({
        name: `${name} – ${skill}`,
        description,
        image: new File([image], image.name, { type: image.type })
    });
    return metadata.url;
}
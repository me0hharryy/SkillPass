export const uploadToIPFS = async (form) => {
  if (!form.image) throw new Error("Image file is required");

  const pinataJWT = import.meta.env.VITE_PINATA_JWT;
  console.log("PINATA JWT from env:", pinataJWT);

  const imageForm = new FormData();
  imageForm.append("file", form.image);

  // Step 1: Upload image to Pinata
  const imageResponse = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: pinataJWT,
    },
    body: imageForm,
  });

  const imageResult = await imageResponse.json();
  if (!imageResponse.ok || !imageResult.IpfsHash) {
    console.error("Image upload failed:", imageResult);
    throw new Error("❌ Image upload failed: " + imageResult?.error || "Unknown error");
  }

  const imageUrl = `ipfs://${imageResult.IpfsHash}`;

  // Step 2: Upload metadata
  const metadata = {
    name: form.name,
    description: form.description,
    image: imageUrl,
    properties: {
      skill: form.skill,
    },
  };

  const metadataResponse = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
    method: "POST",
    headers: {
      Authorization: pinataJWT,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(metadata),
  });

  const metadataResult = await metadataResponse.json();
  if (!metadataResponse.ok || !metadataResult.IpfsHash) {
    console.error("Metadata upload failed:", metadataResult);
    throw new Error("❌ Metadata upload failed: " + metadataResult?.error || "Unknown error");
  }

  return `ipfs://${metadataResult.IpfsHash}`;
};
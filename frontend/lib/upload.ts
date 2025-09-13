const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function uploadAvatarToPinata(
    file: File,
    apiKey?: string,
    secretKey?: string
): Promise<{ hash: string; url: string }> {
    try {
        if (!ALLOWED_TYPES.includes(file.type)) {
            throw new Error("Only JPEG, PNG, and WEBP files are allowed.");
        }

        if (file.size > MAX_SIZE) {
            throw new Error("File size must be less than 5MB.");
        }

        const PINATA_API_KEY = apiKey || process.env.NEXT_PUBLIC_PINATA_API_KEY || "";
        const PINATA_SECRET_KEY = secretKey || process.env.NEXT_PUBLIC_PINATA_SECRET_KEY || "";

        if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
            throw new Error("Pinata API keys missing. Provide them in env vars or via the UI.");
        }

        const formData = new FormData();
        formData.append("file", file, file.name);

        const metadata = JSON.stringify({
            name: `Avatar Upload - ${new Date().toISOString()}`,
            keyvalues: {
                type: "avatar",
                timestamp: Date.now().toString(),
            },
        });
        formData.append("pinataMetadata", metadata);

        const options = JSON.stringify({ cidVersion: 1 });
        formData.append("pinataOptions", options);

        const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
            method: "POST",
            headers: {
                pinata_api_key: PINATA_API_KEY,
                pinata_secret_api_key: PINATA_SECRET_KEY,
            },
            body: formData,
        });

        let result;
        const contentType = response.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {
            result = await response.json();
        } else {
            const text = await response.text();
            throw new Error(`Pinata upload failed. Response: ${text}`);
        }

        if (!response.ok) {
            throw new Error(`Pinata upload failed: ${result.error || response.statusText}`);
        }

        const hash = result.IpfsHash;
        const url = `https://gateway.pinata.cloud/ipfs/${hash}`;

        console.log("Avatar uploaded to Pinata:", { hash, url });
        return { hash, url };
    } catch (error) {
        console.error("Avatar upload error:", error);
        throw new Error(`Failed to upload avatar: ${(error as any).message}`);
    }
}

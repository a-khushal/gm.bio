import { useWallet } from "@solana/wallet-adapter-react"
import { useProgram } from "@/lib/programCllient"
import { useState } from "react"

export interface Link {
    title: string
    url: string
}

interface CreateProfileData {
    username: string
    bio: string
    links: Link[]
}

export const useCreateProfile = () => {
    const { connected, publicKey } = useWallet()
    const program = useProgram()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const createProfile = async (data: CreateProfileData) => {
        if (!program || !publicKey) {
            throw new Error("Wallet not connected")
        }

        setIsLoading(true)
        setError(null)

        try {
            const validLinks = data.links.filter((link) => link.title.trim() && link.url.trim())
            const urls = validLinks.map((link) => link.url)

            await program.methods
                .createProfile(data.username, data.bio, urls)
                .accounts({
                    user: publicKey.toBase58()
                })
                .rpc()

            return true
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to create profile"
            setError(errorMessage)
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    return {
        createProfile,
        isLoading,
        error,
        connected,
        publicKey
    }
}

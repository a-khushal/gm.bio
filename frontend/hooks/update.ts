import { useWallet } from "@solana/wallet-adapter-react"
import { Link } from "./create"
import { useProgram } from "@/lib/program-cllient"
import { useState } from "react"

interface UpdateProfileData {
    bio?: string
    links?: string[]
}

export const useUpdateProfile = () => {
    const { connected, publicKey } = useWallet()
    const program = useProgram()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const updateProfile = async (data: UpdateProfileData) => {
        if (!program || !publicKey) {
            throw new Error("Wallet not connected")
        }

        setIsLoading(true)
        setError(null)

        try {
            await program.methods
                .updateProfile(data.bio || null, data.links || null)
                .accounts({
                    user: publicKey,
                })
                .rpc()

            return true
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to update profile"
            setError(errorMessage)
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    return {
        updateProfile,
        isLoading,
        error,
        connected,
        publicKey,
    }
}

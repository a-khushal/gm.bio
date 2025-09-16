import { useWallet } from "@solana/wallet-adapter-react"
import { useProgram } from "@/lib/programCllient"
import { useState, useEffect } from "react"
import { PublicKey } from "@solana/web3.js"

interface ProfileData {
    owner: string
    username: string
    bio: string
    links: string[]
}

export const useProfile = () => {
    const { connected, publicKey } = useWallet()
    const program = useProgram()
    const [profile, setProfile] = useState<ProfileData | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [exists, setExists] = useState(false)

    const fetchProfile = async () => {
        if (!program || !publicKey) {
            setProfile(null)
            setExists(false)
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const [profilePDA] = PublicKey.findProgramAddressSync(
                [Buffer.from("profile"), publicKey.toBuffer()],
                program.programId
            )
            
            const account = await program.account.userProfile.fetch(profilePDA)

            setProfile({
                owner: account.owner.toString(),
                username: account.username,
                bio: account.bio,
                links: account.links,
            })
            setExists(true)
        } catch (err) {
            setProfile(null)
            setExists(false)
            if (err instanceof Error && !err.message.includes("Account does not exist")) {
                setError(err.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (connected && publicKey && program) {
            fetchProfile()
        } else {
            setProfile(null)
            setExists(false)
        }
    }, [connected, publicKey, program, fetchProfile])

    return {
        profile,
        exists,
        isLoading,
        error,
        refetch: fetchProfile,
    }
}

import { Connection, PublicKey } from "@solana/web3.js"
import { Program, AnchorProvider, setProvider } from "@coral-xyz/anchor"
import idl from "./program/idl/profile_program.json"
import type { ProfileProgram } from "./program/types/profile_program"

const connection = new Connection(process.env.RPC_URL || "https://api.devnet.solana.com")

const dummyWallet = {
    publicKey: PublicKey.default,
    signTransaction: async () => { throw new Error("Not implemented") },
    signAllTransactions: async () => { throw new Error("Not implemented") }
}

const provider = new AnchorProvider(connection, dummyWallet as any, {})
setProvider(provider)

const program = new Program(idl as any, provider) as Program<ProfileProgram>

export interface UserProfile {
    owner: string
    username: string
    bio: string
    links: string[]
    avatar?: string
}

export async function fetchUserProfile(username: string): Promise<UserProfile | null> {
    try {
        const [usernameRegistryPDA] = PublicKey.findProgramAddressSync(
            [Buffer.from("username"), Buffer.from(username, "utf-8")],
            program.programId
        )

        const usernameRegistry = await program.account.usernameRegistry.fetch(usernameRegistryPDA)

        const [profilePDA] = PublicKey.findProgramAddressSync(
            [Buffer.from("profile"), usernameRegistry.owner.toBuffer()],
            program.programId
        )

        const profile = await program.account.userProfile.fetch(profilePDA)

        return {
            owner: profile.owner.toString(),
            username: profile.username,
            bio: profile.bio,
            links: profile.links,
        }
    } catch (error) {
        console.error("Error fetching profile for username:", username, error)
        return null
    }
}

export async function fetchProfileByOwner(owner: string): Promise<UserProfile | null> {
    try {
        const ownerPubkey = new PublicKey(owner)

        const [profilePDA] = PublicKey.findProgramAddressSync(
            [Buffer.from("profile"), ownerPubkey.toBuffer()],
            program.programId
        )

        const profile = await program.account.userProfile.fetch(profilePDA)

        return {
            owner: profile.owner.toString(),
            username: profile.username,
            bio: profile.bio,
            links: profile.links,
        }
    } catch (error) {
        console.error("Error fetching profile for owner:", owner, error)
        return null
    }
}

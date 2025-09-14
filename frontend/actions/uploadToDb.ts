"use server";

import { PublicKey } from "@solana/web3.js";
import prisma from "@/lib/db";

interface Props {
    userPublicKey: string;
    programId: string;
    pinataUrl: string;
}

export async function storeAvatarToDb({ userPublicKey, programId, pinataUrl }: Props) {
    try {
        const [pda] = PublicKey.findProgramAddressSync(
            [Buffer.from("profile"), new PublicKey(userPublicKey).toBuffer()],
            new PublicKey(programId)
        );

        const record = await prisma.pinata.create({
            data: {
                pda: pda.toBase58(),
                pinataUrl,
            },
        });

        return { pda: pda.toBase58(), url: record.pinataUrl };
    } catch (err) {
        console.error("storeAvatarToPinata error:", err);
        throw new Error((err as any).message);
    }
}

export async function updatAvatarInDb({ userPublicKey, programId, pinataUrl }: Props) {
    try {
        const [pda] = PublicKey.findProgramAddressSync(
            [Buffer.from("profile"), new PublicKey(userPublicKey).toBuffer()],
            new PublicKey(programId)
        );

        const record = await prisma.pinata.update({
            where: {
                pda: pda.toBase58()
            },
            data: {
                pda: pda.toBase58(),
                pinataUrl,
            },
        });

        return { pda: pda.toBase58(), url: record.pinataUrl };
    } catch (err) {
        console.error("storeAvatarToPinata error:", err);
        throw new Error((err as any).message);
    }
}
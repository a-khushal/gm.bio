import { NextResponse } from "next/server";
import { PublicKey } from "@solana/web3.js";
import prisma from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { userPublicKey, programId } = await req.json();

        if (!userPublicKey || !programId) {
            return NextResponse.json(
                { error: "Missing userPublicKey or programId" },
                { status: 400 }
            );
        }

        const [pda] = PublicKey.findProgramAddressSync(
            [Buffer.from("profile"), new PublicKey(userPublicKey).toBuffer()],
            new PublicKey(programId)
        );

        const res = await prisma.pinata.findFirst({
            where: { pda: pda.toBase58() },
        });

        return NextResponse.json({ url: res?.pinataUrl || null });
    } catch (err: any) {
        console.error("API /fetch-url error:", err);
        return NextResponse.json(
            { error: err?.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}

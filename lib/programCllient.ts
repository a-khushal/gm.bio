"use client"

import { Program, AnchorProvider, setProvider, Idl } from "@coral-xyz/anchor";
import idl from "@/program/idl/profileProgram.json";
import type { ProfileProgram } from "@/program/types/profileProgram";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

export const useProgram = () => {
    const { wallet, signTransaction, signAllTransactions, publicKey } = useWallet();
    const connection = new Connection(clusterApiUrl("devnet"));

    if (!wallet || !publicKey || !signTransaction || !signAllTransactions) return null;

    const signer = {
        publicKey,
        signTransaction,
        signAllTransactions,
    };
    const provider = new AnchorProvider(connection, signer, {});
    setProvider(provider);

    const program = new Program(idl as Idl, provider) as Program<ProfileProgram>;
    return program
};

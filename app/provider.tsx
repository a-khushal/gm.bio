"use client"

import Wallet from "./wallet-provider"

export default function Provider({ children }: {
    children: React.ReactNode
}) {
    return (
        <Wallet>
            {children}
        </Wallet>
    )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { QrCode, Copy, Check } from "lucide-react"

export function QRSection() {
  const [showQR, setShowQR] = useState(false)
  const [copied, setCopied] = useState(false)

  const profileUrl = "https://gm.bio/gmcrypto.eth"

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <Button
        variant="outline"
        className="w-full border-border hover:bg-muted transition-colors bg-transparent"
        onClick={() => setShowQR(!showQR)}
      >
        <QrCode className="w-4 h-4 mr-2" />
        {showQR ? "Hide QR Code" : "Show QR Code"}
      </Button>

      {showQR && (
        <Card className="p-6 bg-card border-border">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <img src="/qr-code-for-gm-bio-profile.jpg" alt="QR Code for profile" className="w-30 h-30" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-xs text-muted-foreground">Scan to visit profile</p>
              <div className="flex items-center space-x-2">
                <code className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground truncate max-w-[220px]">{profileUrl}</code>
                <Button size="sm" variant="ghost" onClick={copyToClipboard} className="h-6 w-6 p-0">
                  {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="text-center pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Powered by <span className="font-medium text-accent">gm.bio</span> • On-chain verified
        </p>
      </div>
    </div>
  )
}

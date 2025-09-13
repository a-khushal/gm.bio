"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, User, Link as LinkIcon, Copy, Check, Wallet } from "lucide-react"
import { getLinkType } from "@/lib/link"
import { useState } from "react"

interface ProfileDisplayProps {
    profile: {
        owner: string
        username: string
        bio: string
        links: string[]
        avatar?: string
    }
}

export function ProfileDisplay({ profile }: ProfileDisplayProps) {
    const [copiedAddress, setCopiedAddress] = useState(false)
    const [copiedLinks, setCopiedLinks] = useState<{ [key: number]: boolean }>({})

    const getInitials = (username: string) => {
        return username.slice(0, 2).toUpperCase()
    }

    const getLinkIcon = (url: string) => {
        const linkType = getLinkType(url)
        switch (linkType.toLowerCase()) {
            case "twitter":
                return "𝕏"
            case "github":
                return "⚡"
            case "linkedin":
                return "💼"
            case "website":
                return "🌐"
            default:
                return "🔗"
        }
    }

    const copyToClipboard = async (text: string, type: 'address' | 'link', index?: number) => {
        try {
            await navigator.clipboard.writeText(text)
            if (type === 'address') {
                setCopiedAddress(true)
                setTimeout(() => setCopiedAddress(false), 2000)
            } else if (type === 'link' && index !== undefined) {
                setCopiedLinks(prev => ({ ...prev, [index]: true }))
                setTimeout(() => {
                    setCopiedLinks(prev => ({ ...prev, [index]: false }))
                }, 2000)
            }
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    const formatWalletAddress = (address: string) => {
        return `${address.slice(0, 4)}...${address.slice(-4)}`
    }

    return (
        <div className="flex flex-col items-center space-y-6 max-w-2xl mx-auto">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-foreground">gm.bio</h1>
                <p className="text-muted-foreground">@{profile.username}</p>
            </div>

            <Card className="w-full bg-card border-border">
                <CardHeader className="text-center">
                    <div className="flex flex-col items-center space-y-4">
                        <Avatar className="w-24 h-24">
                            <AvatarImage src={profile.avatar} alt={profile.username} />
                            <AvatarFallback className="text-2xl">
                                {getInitials(profile.username)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="space-y-2">
                            <CardTitle className="text-2xl">@{profile.username}</CardTitle>
                            <Badge variant="secondary" className="text-xs">
                                <User className="w-3 h-3 mr-1" />
                                On-chain Profile
                            </Badge>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    {profile.bio && (
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-foreground">Bio</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {profile.bio}
                            </p>
                        </div>
                    )}

                    {profile.links && profile.links.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="text-sm font-medium text-foreground flex items-center">
                                <LinkIcon className="w-4 h-4 mr-2" />
                                Links ({profile.links.length})
                            </h3>
                            <div className="space-y-2">
                                {profile.links.map((url, index) => (
                                    <div
                                        key={index}
                                        className="group relative p-3 rounded-lg border border-border hover:bg-muted/50 transition-all duration-200 hover:shadow-sm"
                                    >
                                        <a
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between w-full"
                                        >
                                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                                                <span className="text-lg flex-shrink-0">
                                                    {getLinkIcon(url)}
                                                </span>
                                                <div className="flex flex-col min-w-0 flex-1">
                                                    <span className="text-sm font-medium text-foreground">
                                                        {getLinkType(url)}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground truncate">
                                                        {url}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2 flex-shrink-0">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        copyToClipboard(url, 'link', index)
                                                    }}
                                                >
                                                    {copiedLinks[index] ? (
                                                        <Check className="w-3 h-3 text-green-500" />
                                                    ) : (
                                                        <Copy className="w-3 h-3" />
                                                    )}
                                                </Button>
                                                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                            </div>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="space-y-3 pt-4 border-t border-border">
                        <h3 className="text-sm font-medium text-foreground flex items-center">
                            <Wallet className="w-4 h-4 mr-2" />
                            Wallet Address
                        </h3>
                        <div className="group relative p-3 rounded-lg bg-muted/30 border border-border hover:bg-muted/50 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 flex-1 min-w-0">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Wallet className="w-4 h-4 text-primary" />
                                    </div>
                                    <div className="flex flex-col min-w-0 flex-1">
                                        <span className="text-sm font-medium text-foreground">
                                            Solana Wallet
                                        </span>
                                        <code className="text-xs text-muted-foreground font-mono">
                                            {formatWalletAddress(profile.owner)}
                                        </code>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 flex-shrink-0">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => copyToClipboard(profile.owner, 'address')}
                                    >
                                        {copiedAddress ? (
                                            <Check className="w-3 h-3 text-green-500" />
                                        ) : (
                                            <Copy className="w-3 h-3" />
                                        )}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => window.open(`https://explorer.solana.com/address/${profile.owner}`, '_blank')}
                                    >
                                        <ExternalLink className="w-3 h-3" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                            This wallet owns and controls this profile on-chain
                        </p>
                    </div>
                </CardContent>
            </Card>

            <div className="text-center space-y-2">
                <p className="text-xs text-muted-foreground">
                    This profile is stored on-chain and verified by Solana
                </p>
                <a
                    href="/create"
                    className="inline-flex items-center text-xs text-primary hover:underline"
                >
                    Create your own gm.bio profile
                </a>
            </div>
        </div>
    )
}

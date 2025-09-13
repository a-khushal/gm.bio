import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Shield } from "lucide-react"

interface ProfileData {
  username: string
  bio: string
  links: Array<{ title: string; url: string }>
  avatar?: string
}

interface ProfileSectionProps {
  profileData: ProfileData | null
}

export function ProfileSection({ profileData }: ProfileSectionProps) {
  const username = profileData?.username || "gm.crypto"
  const bio =
    profileData?.bio ||
    "Building the future of Web3 🚀 NFT collector & DeFi enthusiast. Always saying gm to the community ☀️"
  const avatar = profileData?.avatar || "/crypto-punk-nft-avatar.jpg"

  const initials = username.slice(0, 2).toUpperCase()

  return (
    <div className="flex flex-col items-center space-y-4 text-center max-w-md mx-auto">
      <div className="relative">
        <Avatar className="w-24 h-24 border-2 border-border">
          <AvatarImage src={avatar || "/placeholder.svg"} alt="Profile picture" />
          <AvatarFallback className="text-2xl font-bold bg-muted">{initials}</AvatarFallback>
        </Avatar>

        <Badge
          variant="secondary"
          className="absolute -bottom-1 -right-1 p-1 rounded-full bg-accent hover:bg-accent/90 transition-colors"
        >
          <Shield className="w-3 h-3 text-accent-foreground" />
        </Badge>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">{username}</h1>
        <p className="text-sm text-muted-foreground">@{username.toLowerCase().replace(/\s+/g, "")}</p>
      </div>

      <p className="text-sm text-muted-foreground max-w-sm leading-relaxed text-balance">{bio}</p>
    </div>
  )
}

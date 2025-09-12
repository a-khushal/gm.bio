"use client"

import { Card } from "@/components/ui/card"
import { Globe, Twitter, MessageCircle, Github, ExternalLink, Heart, LinkIcon } from "lucide-react"

interface Link {
  title: string
  url: string
}

interface LinksSectionProps {
  links: Link[]
}

const getIconForLink = (title: string) => {
  const lowerTitle = title.toLowerCase()
  if (lowerTitle.includes("twitter") || lowerTitle.includes("x.com")) return Twitter
  if (lowerTitle.includes("github")) return Github
  if (lowerTitle.includes("discord")) return MessageCircle
  if (lowerTitle.includes("website") || lowerTitle.includes("portfolio")) return Globe
  if (lowerTitle.includes("donate") || lowerTitle.includes("tip")) return Heart
  return LinkIcon
}

export function LinksSection({ links }: LinksSectionProps) {
  return (
    <div className="w-full max-w-md mx-auto space-y-2">
      <div className="space-y-2">
        {links.map((link, index) => {
          const IconComponent = getIconForLink(link.title)
          return (
            <Card
              key={index}
              className="bg-card hover:bg-muted border border-border transition-colors cursor-pointer group"
              onClick={() => window.open(link.url, "_blank")}
            >
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-accent/10 transition-colors">
                    <IconComponent className="w-4 h-4 text-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground text-sm">{link.title}</h3>
                    <p className="text-xs text-muted-foreground truncate max-w-[200px] sm:max-w-[260px]">{link.url}</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

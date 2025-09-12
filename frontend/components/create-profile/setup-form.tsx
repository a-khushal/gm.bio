"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, X, Upload } from "lucide-react"
import dynamic from "next/dynamic"
import { useCreateProfile } from "@/hooks/useCreateProfile"

const WalletMultiButton = dynamic(
  async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
)

const MAX_USERNAME_LEN = 32
const MAX_BIO_LEN = 280
const MAX_LINKS = 8
const MAX_LINK_LEN = 128

interface Link {
  title: string
  url: string
}

interface SetupFormProps {
  onComplete: (data: {
    username: string
    bio: string
    links: Link[]
    avatar?: string
  }) => void
}

export function SetupForm({ onComplete }: SetupFormProps) {
  const { createProfile, isLoading, error, connected } = useCreateProfile()
  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")
  const [links, setLinks] = useState<Link[]>([{ title: "", url: "" }])
  const [avatar, setAvatar] = useState<string>("")

  const [usernameError, setUsernameError] = useState("")
  const [linkErrors, setLinkErrors] = useState<{ [key: number]: { title?: string; url?: string } }>({})

  const addLink = () => {
    if (links.length < MAX_LINKS) {
      setLinks([...links, { title: "", url: "" }])
    }
  }

  const removeLink = (index: number) => {
    if (links.length > 1) {
      setLinks(links.filter((_, i) => i !== index))
      const newErrors = { ...linkErrors }
      delete newErrors[index]
      setLinkErrors(newErrors)
    }
  }

  const updateLink = (index: number, field: keyof Link, value: string) => {
    const updatedLinks = links.map((link, i) => (i === index ? { ...link, [field]: value } : link))
    setLinks(updatedLinks)

    const newLinkErrors = { ...linkErrors }
    if (!newLinkErrors[index]) newLinkErrors[index] = {}

    if (value.length > MAX_LINK_LEN) {
      newLinkErrors[index][field] = `${field === "title" ? "Title" : "URL"} must be ${MAX_LINK_LEN} characters or less`
    } else {
      delete newLinkErrors[index][field]
      if (Object.keys(newLinkErrors[index]).length === 0) {
        delete newLinkErrors[index]
      }
    }
    setLinkErrors(newLinkErrors)
  }

  const handleUsernameChange = (value: string) => {
    setUsername(value)
    if (value.length > MAX_USERNAME_LEN) {
      setUsernameError(`Username must be ${MAX_USERNAME_LEN} characters or less`)
    } else {
      setUsernameError("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validLinks = links.filter((link) => link.title.trim() && link.url.trim())
    const profileData = {
      username,
      bio,
      links: validLinks,
      avatar,
    }
    
    try {
      await createProfile(profileData)
      onComplete(profileData)
      alert('done')
    } catch (err) {
      console.error("Failed to create profile:", err)
    }
  }

  const isFormValid =
    connected &&
    username.trim() &&
    username.length <= MAX_USERNAME_LEN &&
    bio.trim() &&
    bio.length <= MAX_BIO_LEN &&
    links.some((link) => link.title.trim() && link.url.trim()) &&
    !usernameError &&
    Object.keys(linkErrors).length === 0

  return (
    <div className="flex flex-col items-center space-y-6 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">gm.bio</h1>
        <p className="text-muted-foreground">Create your on-chain-bio</p>
      </div>

      <Card className="w-full bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl text-center">Setup Your Profile</CardTitle>
        </CardHeader>
        <div>
          <div className="w-full flex justify-center">
            <WalletMultiButton />
          </div>
          {!connected && (
            <p className="text-xs text-destructive mt-2 text-center">
              Please connect your wallet to create a profile
            </p>
          )}
          {error && (
            <p className="text-xs text-destructive mt-2 text-center">
              {error}
            </p>
          )}
        </div>
        <CardContent>
          <form onSubmit={handleSubmit} className={`space-y-6 ${!connected ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Profile Picture</label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-muted border-2 border-dashed border-border flex items-center justify-center shrink-0">
                  {avatar ? (
                    <img
                      src={avatar || "/placeholder.svg"}
                      alt="Avatar"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <Upload className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <Input
                  type="url"
                  placeholder="Enter image URL"
                  value={avatar}
                  onChange={(e: any) => setAvatar(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Username *</label>
              <Input
                type="text"
                placeholder="your-username"
                value={username}
                onChange={(e: any) => handleUsernameChange(e.target.value)}
                required
                className="w-full"
              />
              {usernameError && <p className="text-xs text-destructive">{usernameError}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Bio *</label>
              <Textarea
                placeholder="Tell the world about yourself..."
                value={bio}
                onChange={(e: any) => {
                  if (e.target.value.length <= MAX_BIO_LEN) {
                    setBio(e.target.value)
                  }
                }}
                required
                className="w-full min-h-[80px] resize-none"
              />
              <p className="text-xs text-muted-foreground text-right">
                {bio.length}/{MAX_BIO_LEN}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">
                  Links *
                  <span className="text-muted-foreground font-normal">
                    ({links.length}/{MAX_LINKS})
                  </span>
                </label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addLink}
                  className="text-xs bg-transparent"
                  disabled={links.length >= MAX_LINKS}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add Link
                </Button>
              </div>

              <div className="space-y-3">
                {links.map((link, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="flex-1 space-y-2">
                      <div className="space-y-1">
                        <Input
                          type="text"
                          placeholder="Link title (e.g., Website, Twitter)"
                          value={link.title}
                          onChange={(e) => updateLink(index, "title", e.target.value)}
                          className="w-full"
                        />
                        {linkErrors[index]?.title && (
                          <p className="text-xs text-destructive">{linkErrors[index].title}</p>
                        )}
                      </div>
                      <div className="space-y-1">
                        <Input
                          type="url"
                          placeholder="https://..."
                          value={link.url}
                          onChange={(e: any) => updateLink(index, "url", e.target.value)}
                          className="w-full"
                        />
                        {linkErrors[index]?.url && <p className="text-xs text-destructive">{linkErrors[index].url}</p>}
                      </div>
                    </div>
                    {links.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLink(index)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Button
                type="submit"
                disabled={!isFormValid || isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              >
                {isLoading ? "Creating Profile..." : !connected ? "Connect Wallet First" : "Create Profile"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground text-center">
        Your profile will be stored on-chain for permanent access
      </p>
    </div>
  )
}

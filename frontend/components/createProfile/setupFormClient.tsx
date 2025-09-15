"use client"

import { useEffect, useId, useRef, useState } from "react"
import { Button } from "@/frontend/components/ui/button"
import { Input } from "@/frontend/components/ui/input"
import { Textarea } from "@/frontend/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/frontend/components/ui/card"
import { Plus, X, Upload, User, ArrowUpRight } from "lucide-react"
import dynamic from "next/dynamic"
import { useCreateProfile } from "@/hooks/create"
import { useUpdateProfile } from "@/hooks/update"
import { useProfile } from "@/hooks/useProfile"
import { getLinkType } from "@/lib/link"
import Link from "next/link"
import { uploadAvatarToPinata } from "@/lib/upload"
import { useWallet } from "@solana/wallet-adapter-react"
import { storeAvatarToDb, updatAvatarInDb } from "@/frontend/actions/uploadToDb"
import { useProgram } from "@/lib/programCllient"
import { Badge } from "../ui/badge"

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

interface SetupFormClientProps {
    onSetupComplete?: (data: {
        username: string
        bio: string
        links: Array<{ title: string; url: string }>
        avatar?: string
    }) => void
}

export interface AvatarUploaderProps {
    avatar: string;
    setAvatar: React.Dispatch<React.SetStateAction<string>>;
    setFile?: React.Dispatch<React.SetStateAction<File | null>>;
}
const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const AvatarUploader: React.FC<AvatarUploaderProps & { setFile: React.Dispatch<React.SetStateAction<File | null>> }> = ({
    avatar,
    setAvatar,
    setFile
}) => {
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!ALLOWED_TYPES.includes(file.type)) {
            setError("Only JPEG, PNG, and WEBP are allowed.");
            return;
        }

        if (file.size > MAX_SIZE) {
            setError("File size must be less than 5MB.");
            return;
        }

        setError(null);
        setFile(file);
        setAvatar(URL.createObjectURL(file));
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Upload avatar"
                className="w-28 h-28 rounded-full border border-gray-300 bg-gray-50 shadow-md flex items-center justify-center overflow-hidden relative group focus:outline-none focus:ring-2 focus:ring-primary transition"
            >
                {avatar ? (
                    <img src={avatar} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                ) : (
                    <Upload className="w-12 h-12 text-gray-400" />
                )}

                <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/jpeg, image/png, image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                />

                <span className="absolute inset-0 rounded-full bg-black/15 opacity-0 group-hover:opacity-100 transition" />
            </button>

            {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
        </div>
    );
};


export function SetupFormClient({ onSetupComplete }: SetupFormClientProps) {
    const { createProfile, isLoading: createLoading, error: createError, connected } = useCreateProfile()
    const { updateProfile, isLoading: updateLoading, error: updateError } = useUpdateProfile()
    const { profile, exists, isLoading: profileLoading } = useProfile()
    const lastProfileOwner = useRef<string | null>(null)
    const [username, setUsername] = useState("")
    const [bio, setBio] = useState("")
    const [links, setLinks] = useState<Link[]>([{ title: "", url: "" }])
    const [avatar, setAvatar] = useState<string>("")
    const [file, setFile] = useState<File | null>(null);
    const { publicKey } = useWallet()
    const program = useProgram()
    const [url, setUrl] = useState<string | null>("");
    const [avatarLoading, setAvatarLoading] = useState(false);

    const [usernameError, setUsernameError] = useState("")
    const [linkErrors, setLinkErrors] = useState<{ [key: number]: { title?: string; url?: string } }>({})

    useEffect(() => {
        if (!program || !profile) return;

        if (exists && profile.owner !== lastProfileOwner.current) {
            lastProfileOwner.current = profile.owner;

            setBio(profile.bio);

            const normalizedLinks: Link[] = profile.links.map((url) => ({
                title: "",
                url,
            }));

            setLinks(
                normalizedLinks.length ? normalizedLinks : [{ title: "", url: "" }]
            );
        }

        const fetchUrl = async () => {
            try {
                const res = await fetch("/api/fetchUrl", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userPublicKey: profile.owner,
                        programId: program.programId.toString(),
                    }),
                });

                const data = await res.json();
                if (data.url) setUrl(data.url);
            } catch (err) {
                console.error("Failed to fetch URL:", err);
            }
        };

        fetchUrl();
    }, [program, exists, profile]);

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

            if (file) {
                const { url } = await uploadAvatarToPinata(file)

                setAvatar(url)
                profileData.avatar = url

                await storeAvatarToDb({
                    userPublicKey: publicKey?.toBase58()!,
                    programId: program?.programId.toBase58()!,
                    pinataUrl: url
                })
            }

            if (onSetupComplete) {
                onSetupComplete(profileData)
            } else {
                alert("Profile created successfully!")
            }
        } catch (err) {
            console.error(err)
        }
    }


    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        const updateData: { bio?: string; links?: string[]; avatar?: string } = {};
        const updatedUrls = links.map((l) => l.url.trim()).filter(Boolean);

        if (bio !== profile?.bio) updateData.bio = bio;
        if (!profile?.links || profile.links.length !== updatedUrls.length || profile.links.some((url, idx) => url !== updatedUrls[idx])) {
            updateData.links = updatedUrls;
        }

        try {
            if (file) {
                setAvatarLoading(true);
                const { url } = await uploadAvatarToPinata(file);
                setAvatar(url);
                updateData.avatar = url;

                if (publicKey && program?.programId) {
                    await updatAvatarInDb({
                        userPublicKey: publicKey.toBase58(),
                        programId: program.programId.toBase58(),
                        pinataUrl: url,
                    });
                }

                alert("Avatar updated successfully!");
                setFile(null);
                setAvatarLoading(false);
            }

            if (!updateData.bio && !updateData.links) return;

            if (!connected || !publicKey || !program?.programId) {
                alert("Please connect your wallet to update bio or links.");
                return;
            }

            await updateProfile(updateData);

            if (onSetupComplete && profile) {
                const validLinks = links.filter((link) => link.title.trim() && link.url.trim());
                onSetupComplete({
                    username: profile.username,
                    bio,
                    links: validLinks,
                    avatar: updateData.avatar || avatar,
                });
            } else {
                alert("Profile updated successfully!");
            }
        } catch (err) {
            console.error("Update error:", err);
            setAvatarLoading(false);
        }
    };

    const isFormValid =
        connected &&
        username.trim() &&
        username.length <= MAX_USERNAME_LEN &&
        bio.trim() &&
        bio.length <= MAX_BIO_LEN &&
        links.some((link) => link.title.trim() && link.url.trim()) &&
        !usernameError &&
        Object.keys(linkErrors).length === 0

    const hasChanges =
        bio !== (profile?.bio || "") ||
        avatar !== (url || "") ||
        JSON.stringify(links) !== JSON.stringify(profile?.links || [])

    return (
        <>
            {exists && profile && (
                <Card className="w-full bg-card border-border">
                    <div>
                        <div className="w-full flex justify-center">
                            <WalletMultiButton />
                        </div>
                        {!connected && (
                            <p className="text-xs text-destructive mt-2 text-center">
                                Please connect your wallet to update your profile
                            </p>
                        )}
                        {updateError && (
                            <p className="text-xs text-destructive mt-2 text-center">
                                {updateError}
                            </p>
                        )}
                    </div>
                    <CardContent>
                        <form onSubmit={handleUpdate} className="space-y-6">
                            <div className="flex flex-col items-center justify-center space-y-3">
                                <AvatarUploader
                                    avatar={avatar || url || ""}
                                    setAvatar={setAvatar}
                                    setFile={setFile}
                                />
                                <div className="space-y-1 text-center">
                                    <CardTitle className="text-2xl">@{profile.username}</CardTitle>
                                    <Badge
                                        variant="secondary"
                                        className="text-xs inline-flex items-center"
                                    >
                                        <User className="w-3 h-3 mr-1" />
                                        On-chain Profile
                                    </Badge>
                                </div>
                            </div>
                            {profile?.username && (
                                <div className="text-center mt-2">
                                    <Link
                                        href={`/u/${profile.username}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center text-sm font-medium text-primary hover:text-primary/90 transition-colors"
                                    >
                                        <span>View your profile</span>
                                        <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            )}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Bio *</label>
                                <Textarea
                                    placeholder="Update your bio..."
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
                                                        value={link.title || (link.url ? getLinkType(link.url) : "")}
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
                                                    {linkErrors[index]?.url && (
                                                        <p className="text-xs text-destructive">{linkErrors[index].url}</p>
                                                    )}
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

                            <Button
                                type="submit"
                                variant="default"
                                disabled={!hasChanges || updateLoading || avatarLoading || !connected}
                                className="w-full font-medium"
                            >
                                {avatarLoading
                                    ? "Uploading Avatar..."
                                    : updateLoading
                                        ? "Updating Profile..."
                                        : "Update Profile"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            {!exists && (
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
                        {createError && (
                            <p className="text-xs text-destructive mt-2 text-center">
                                {createError}
                            </p>
                        )}
                    </div>
                    <CardContent>
                        <form onSubmit={handleSubmit} className={`space-y-6 ${!connected ? 'opacity-50 pointer-events-none' : ''}`}>
                            <div className="space-y-2">
                                <AvatarUploader avatar={avatar} setAvatar={setAvatar} setFile={setFile} />
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
                                    disabled={!isFormValid || createLoading}
                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                                >
                                    {createLoading ? "Creating Profile..." : !connected ? "Connect Wallet First" : exists ? "Update Profile" : "Create Profile"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}
        </>
    )
}

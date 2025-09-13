import { ProfileDisplay } from "@/components/profile-display"
import { fetchUserProfile } from "@/lib/fetch-profile"
import { notFound } from "next/navigation"

interface UserPageProps {
    params: {
        username: string
    }
}

export default async function UserPage({ params }: UserPageProps) {
    const { username } = params

    try {
        const profile = await fetchUserProfile(username)

        if (!profile) {
            notFound()
        }

        return (
            <main className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8 max-w-md">
                    <ProfileDisplay profile={profile} />
                </div>
            </main>
        )
    } catch (error) {
        console.error("Error fetching profile:", error)
        notFound()
    }
}

export async function generateMetadata({ params }: UserPageProps) {
    const { username } = params

    try {
        const profile = await fetchUserProfile(username)

        if (!profile) {
            return {
                title: "User Not Found - gm.bio",
                description: "The requested user profile could not be found."
            }
        }

        return {
            title: `${profile.username} - gm.bio`,
            description: profile.bio || `View ${profile.username}'s profile on gm.bio`,
            openGraph: {
                title: `${profile.username} - gm.bio`,
                description: profile.bio || `View ${profile.username}'s profile on gm.bio`,
                images: profile.avatar ? [profile.avatar] : [],
            },
        }
    } catch (error) {
        return {
            title: "User Not Found - gm.bio",
            description: "The requested user profile could not be found."
        }
    }
}

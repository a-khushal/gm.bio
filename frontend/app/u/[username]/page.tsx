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
            <main className="min-h-screen bg-background flex items-center justify-center">
                <div className="container px-4 max-w-md">
                    <ProfileDisplay profile={profile} />
                </div>
            </main>
        )
    } catch (error) {
        console.error("Error fetching profile:", error)
        notFound()
    }
}


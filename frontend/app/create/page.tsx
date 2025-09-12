"use client"

import { useState } from "react"
import { ProfileSection } from "@/components/create-profile/profile-section"
import { LinksSection } from "@/components/create-profile/links-section"
import { QRSection } from "@/components/create-profile/qr-section"
import { SetupForm } from "@/components/create-profile/setup-form"

export default function HomePage() {
  const [isSetupComplete, setIsSetupComplete] = useState(false)
  const [profileData, setProfileData] = useState<{
    username: string
    bio: string
    links: Array<{ title: string; url: string }>
    avatar?: string
  } | null>(null)

  const handleSetupComplete = (data: {
    username: string
    bio: string
    links: Array<{ title: string; url: string }>
    avatar?: string
  }) => {
    setProfileData(data)
    setIsSetupComplete(true)
  }

  if (!isSetupComplete) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-md">
          <SetupForm onComplete={handleSetupComplete} />
        </div>
      </main>
    )
  }

  // return (
  //   <main className="min-h-screen bg-background">
  //     <div className="container mx-auto px-4 py-8 max-w-md">
  //       <div className="flex flex-col items-center space-y-8">
  //         <ProfileSection profileData={profileData} />
  //         <LinksSection links={profileData?.links || []} />
  //         <QRSection />
  //       </div>
  //     </div>
  //   </main>
  // )
}

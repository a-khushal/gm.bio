import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserX, Plus } from "lucide-react"

export default function NotFound() {
    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 max-w-md">
                <div className="flex flex-col items-center space-y-6 max-w-2xl mx-auto">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold text-foreground">gm.bio</h1>
                        <p className="text-muted-foreground">User not found</p>
                    </div>

                    <Card className="w-full bg-card border-border">
                        <CardHeader className="text-center">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="w-16 h-16 rounded-full bg-muted border-2 border-dashed border-border flex items-center justify-center">
                                    <UserX className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <CardTitle className="text-xl">Profile Not Found</CardTitle>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-4 text-center">
                            <p className="text-muted-foreground">
                                The user profile you&lsquo;re looking for doesn&lsquo;t exist.
                            </p>

                            <div className="space-y-3 pt-4">
                                <Button asChild className="w-full">
                                    <Link href="/create">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Create Your Profile
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex items-center justify-center space-x-2">
                        <p className="text-xs text-muted-foreground">
                            All profiles on gm.bio are stored on-chain and verified by
                        </p>
                        <Image 
                            src="/solanaLogo.svg" 
                            alt="Solana" 
                            width={40}
                            height={12}
                            className="h-3 w-auto"
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}

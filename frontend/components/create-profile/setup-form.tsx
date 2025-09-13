import { SetupFormClient } from "./setup-form-client"

interface SetupFormProps {
  onSetupComplete?: (data: {
    username: string
    bio: string
    links: Array<{ title: string; url: string }>
    avatar?: string
  }) => void
}

export function SetupForm({ onSetupComplete }: SetupFormProps) {
  return (
    <div className="flex flex-col items-center space-y-6 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">gm.bio</h1>
        <p className="text-muted-foreground">Create your on-chain-bio</p>
      </div>

      <SetupFormClient onSetupComplete={onSetupComplete} />

      <p className="text-xs text-muted-foreground text-center">
        Your profile will be stored on-chain for permanent access
      </p>
    </div>
  )
}

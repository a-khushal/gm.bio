import { SetupFormClient } from "./setup-form-client"

export function SetupForm() {
  return (
    <div className="flex flex-col items-center space-y-6 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">gm.bio</h1>
      </div>

      <SetupFormClient />

      <p className="text-xs text-foreground text-center">
        Your profile will be stored{' '}
        <a
          href="#"
          className="text-primary font-semibold hover:underline"
        >
          on-chain
        </a>{' '}
        for permanent access
      </p>
    </div>
  )
}

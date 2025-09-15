import { SetupFormClient } from "./setup-form-client"

export function SetupForm() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center space-y-6 max-w-2xl w-full">
        <SetupFormClient />
        <p className="text-xs text-foreground text-center">
          Your profile will be stored{" "}
          <span className="text-primary font-semibold">
            on-chain
          </span>{" "}
          for permanent access
        </p>
      </div>
    </main>
  )
}

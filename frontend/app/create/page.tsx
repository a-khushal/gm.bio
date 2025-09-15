import { CreatePageClient } from "@/components/create-profile/create-page-client";

export default function CreatePage() {
  return (
    <main className="relative min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-8 max-w-md">
        <CreatePageClient />
      </div>
    </main>
  );
}
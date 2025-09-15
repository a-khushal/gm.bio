import { CreatePageClient } from "@/components/create-page-client";
import { Navbar } from "@/components/navbar";

export default function CreatePage() {
  return (
    <main className="relative min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-8 max-w-md">
        <CreatePageClient />
      </div>
    </main>
  );
}
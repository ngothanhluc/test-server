import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Pow API Server
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  A powerful and flexible API server built with Next.js, ready
                  to handle your data requests and integrations.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/requests">View Requests</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="https://github.com/ngothanhluc" target="_blank">
                    GitHub Repository
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Fast & Reliable</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Built with performance in mind to handle high-volume requests
                  efficiently.
                </p>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Secure</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Implements industry-standard security practices to protect
                  your data.
                </p>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Easy to Use</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Simple API endpoints with clear documentation for quick
                  integration.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

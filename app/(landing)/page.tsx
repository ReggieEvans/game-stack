import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-16">
      <section className="max-w-5xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-7xl font-header font-bold tracking-[8px]">
          Next v15 Starter Template
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          A modern full-stack boilerplate with authentication, access control,
          styling, and testing built in — everything you need to launch fast.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login">
            <Button size="lg">Log In</Button>
          </Link>
          <Link href="/signup">
            <Button variant="outline" size="lg">
              Sign Up
            </Button>
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto mt-20 space-y-14">
        <FeatureCategory title="Authentication & Access">
          <li>Email + password authentication</li>
          <li>JWT token-based session with HttpOnly cookies</li>
          <li>Role-based authorization (admin, user, etc.)</li>
          <li>Protected routes via middleware</li>
        </FeatureCategory>

        <FeatureCategory title="User Experience">
          <li>Light & dark mode with system detection</li>
          <li>Theme toggle powered by ShadCN + next-themes</li>
          <li>Toast notifications for feedback</li>
          <li>Responsive UI using Tailwind CSS</li>
        </FeatureCategory>

        <FeatureCategory title="Styling & Theming">
          <li>Custom Google font for body (Inter)</li>
          <li>Local font for headers (Brunson)</li>
          <li>Tailwind CSS custom color palette</li>
          <li>CSS variables mapped via Tailwind config</li>
        </FeatureCategory>

        <FeatureCategory title="Password Flows">
          <li>Forgot password form with reset email (console logged)</li>
          <li>Secure token-based reset with expiration</li>
          <li>Client-side validation via React Hook Form + Zod</li>
        </FeatureCategory>

        <FeatureCategory title="Developer Experience">
          <li>Jest unit testing with React Testing Library</li>
          <li>Cypress E2E testing for login & flow validation</li>
          <li>Path aliases with TypeScript (`@/`)</li>
          <li>Next.js App Router + Server Components</li>
        </FeatureCategory>
      </section>

      <footer className="mt-24 text-center text-sm text-muted-foreground">
        Built with ❤️ using Next.js, Tailwind CSS, ShadCN, and MongoDB.
      </footer>
    </main>
  );
}

function FeatureCategory({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold font-heading mb-2">{title}</h2>
      <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
        {children}
      </ul>
    </div>
  );
}

import Image from "next/image";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-md p-8 text-foreground">
        <div className="flex justify-center py-4">
          <Image
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={180}
            priority
          />
        </div>
        {children}
      </div>
    </main>
  );
};

export default Layout;

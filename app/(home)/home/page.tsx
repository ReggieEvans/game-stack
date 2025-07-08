import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserFromToken } from "@/lib/getUserFromToken";

export default async function HomePage() {
  const user = await getUserFromToken();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-background">
      <Card className="max-w-xl w-full text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-heading">
            Welcome{user?.username ? `, ${user.username}` : ""}!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            You&apos;re now logged in. This is your home page.
          </p>
          <p className="text-sm text-muted-foreground">
            You can start customizing your dashboard, connect APIs, or build new
            features.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

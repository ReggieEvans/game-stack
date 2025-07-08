import Header from "@/components/Header";
import { getUserFromToken } from "@/lib/getUserFromToken";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromToken();

  return (
    <>
      <Header userName={user?.username} role={user?.role} />
      <main>{children}</main>
    </>
  );
}

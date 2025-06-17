import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";

import { LogOut } from "lucide-react";

export default async function Home() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const user = await getUser();
  console.log(user, ":here");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-4xl font-bold">Expense Management</h1>

      {!isUserAuthenticated ? (
        <>
          <p className="text-lg text-gray-600">Manage your spending easily.</p>
          <div className="flex gap-4">
            <Button size="lg" variant="outline" asChild>
              <LoginLink>Sign in</LoginLink>
            </Button>
            <Button size="lg" asChild>
              <RegisterLink>Sign up</RegisterLink>
            </Button>
          </div>
        </>
      ) : (
        <>
          <p className="text-lg">
            Welcome, <strong>{user?.given_name ?? "User"}</strong>!
          </p>
          <LogoutLink>
            <LogOut />
          </LogoutLink>
        </>
      )}
    </main>
  );
}

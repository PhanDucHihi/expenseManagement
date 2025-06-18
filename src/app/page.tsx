import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";

import { createUser, findUserById } from "@/lib/queries/insertUser";

export default async function Home() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const user = await getUser();
  if (user) {
    const existingUser = await findUserById(user?.id);
    if (!existingUser) {
      const { id, email, family_name, given_name } = user;
      await createUser({
        id,
        email: email || "",
        firstName: given_name || "",
        lastName: family_name || "",
      });
    }
  }

  return (
    <main className="bg-[url('/images/home-img.jpg')] min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-4xl font-bold text-white">Expense Management</h1>

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
          <p className="text-lg text-white">
            Welcome, <strong>{user?.given_name ?? "User"}</strong>!
          </p>
          {/* <LogoutLink>
            <LogOut />
          </LogoutLink> */}
        </>
      )}
    </main>
  );
}

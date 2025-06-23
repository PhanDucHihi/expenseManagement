// app/login/page.tsx
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const { isAuthenticated } = getKindeServerSession();
  const loggedIn = await isAuthenticated();
  if (loggedIn) {
    // Nếu đã đăng nhập thì chuyển về trang chính
    redirect("/");
  }

  // Nếu chưa đăng nhập thì chuyển đến trang đăng nhập Kinde
  redirect("/api/auth/login");
}

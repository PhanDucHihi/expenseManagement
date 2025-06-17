// app/login/page.tsx
import { redirect } from "next/navigation";

export default function Page() {
  redirect("/api/auth/login");
}

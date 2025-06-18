import type { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

type Props = {
  icon: LucideIcon;
  href: string;
  label: string;
  size?: "icon" | "default" | "sm" | "lg" | null | undefined;
};

export function NavButton({ icon: Icon, href, label, size = "icon" }: Props) {
  return (
    <Button
      variant="ghost"
      size={size}
      aria-label={label}
      title={label}
      className="rounded-full"
      asChild
    >
      <Link href={href}>
        <Icon />
      </Link>
    </Button>
  );
}

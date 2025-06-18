import { HomeIcon, LogOut } from "lucide-react";
import { NavButton } from "../NavButton";
import { Button } from "../ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { navItems } from "@/constants";
import { ModeToggle } from "../Mode-toggle";

export default function Header() {
  return (
    <>
      <header className="animate-slide p-2 border-b sticky top-0 z-20 bg-background">
        <div className=" flex justify-between m-full items-center">
          <div className="flex items-center gap-2">
            <p>Home</p>
            <NavButton icon={HomeIcon} href="/home" label="home" size="sm" />
          </div>
          <div className="flex gap-8">
            {navItems.map((item, index) => {
              const { href, label, icon } = item;
              return (
                <div key={index} className="flex flex-col items-center">
                  {" "}
                  <NavButton icon={icon} href={href} label={label} />
                  <p className="text-center">{label}</p>
                </div>
              );
            })}
          </div>
          <div>
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              aria-label="Logout"
              title="Logout"
              className="rounded-full"
              asChild
            >
              <LogoutLink>
                <LogOut />
              </LogoutLink>
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}

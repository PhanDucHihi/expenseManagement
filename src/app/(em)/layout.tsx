import Header from "@/components/layout/Header";

export default function EmLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>
        <Header />
        <main>{children}</main>
      </div>
    </>
  );
}

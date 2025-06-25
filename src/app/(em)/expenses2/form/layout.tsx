type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      {" "}
      <div className="flex flex-col items-center space-y-4">
        <div>
          <h1 className="text-center">Create Expense - Form Step</h1>
        </div>
        <div>{children}</div>
      </div>
    </>
  );
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ExpensesFormPage({ params }: Props) {
  const { slug } = await params;

  return (
    <div className="p-2 space-y-2">
      <div className="w-full flex flex-col items-center">
        <h1>{slug === "new" ? "Create New Expense" : "Edit expense"}</h1>
        <div>ExpensesFormPage </div>
      </div>
    </div>
  );
}

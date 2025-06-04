export function TransactionItemNoContent() {
  return (
    <div className="flex flex-col gap-5 animate-appear bg-secondary-bg-color shadow items-center p-3 rounded-lg hover:bg-secondary-bg-color/80 sm:flex-row sm:p-4">
      <p className="text-sm text-gray-400">No transactions found</p>
    </div>
  );
}

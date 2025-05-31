interface SelectionCardProps {
  icon: React.ReactNode;
  title: string;
  isSelected: boolean;
  handleSelection: () => void;
}

export function SelectionCard({
  title,
  icon,
  isSelected,
  handleSelection,
}: SelectionCardProps) {
  return(<div
    onClick={handleSelection}
    className={`flex-1 cursor-pointer border transition-colors rounded-md ${isSelected ? 'border-blue-300 bg-blue-100' : 'border-gray-300'}`}
  >
    <div className="flex flex-col items-center justify-center p-6 space-y-2">
      {icon}
      <span className="text-sm">{title}</span>
    </div>
  </div>)
}

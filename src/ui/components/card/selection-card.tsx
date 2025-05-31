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
    className={`flex-1 cursor-pointer border-2 transition-colors bg-secondary-bg-color rounded-md ${isSelected ? 'border-black bg-blue-100' : 'dark:border-0 border-gray-300'}`}
  >
    <div className="flex flex-col items-center justify-center p-6 space-y-2">
      {icon}
      <span className="text-md font-bold">{title}</span>
    </div>
  </div>)
}

import { Search } from "lucide-react";
import { ChangeEventHandler, FC } from "react";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const SearchBar: FC<SearchBarProps> = ({
  placeholder = "...",
  className = "",
  onChange,
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <Search className="absolute text-primary top-1/2 left-2 -translate-y-1/2" />
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className="px-2 py-2 text-center w-full rounded border-2 border-primary pl-10 hover:ring-1 hover:ring-primary/50 bg-background-secondary transition-all focus:outline-0 duration-200"
      />
    </div>
  );
};

export default SearchBar;

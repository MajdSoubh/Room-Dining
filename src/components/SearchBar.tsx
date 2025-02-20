import { SearchIcon } from "./Icons";

export default function SearchBar({ placeholder = "...", className = "" }) {
  return (
    <div className={"relative w-full " + className}>
      <SearchIcon className="absolute top-1/2 left-2 -translate-y-1/2" />
      <input
        type="text"
        placeholder={placeholder}
        className="px-2 py-2 w-full rounded-lg border-2 border-primary pl-9 hover:ring-1 hover:ring-primary/50  transition-all focus:outline-0 duration-200"
      />
    </div>
  );
}

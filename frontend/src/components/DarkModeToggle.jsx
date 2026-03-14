import { FaMoon } from "react-icons/fa";

export default function DarkModeToggle() {
  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <FaMoon
      onClick={toggleDark}
      className="text-xl cursor-pointer"
    />
  );
}

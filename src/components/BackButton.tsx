import { IoMdHome } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/useTheme";
import Button from "./Button";

const BackButton = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <Button
      onClick={() => navigate("/")}
      className={`w-10 h-10 border ${
        theme === "dark"
          ? "bg-gray-900 hover:bg-gray-800"
          : " bg-white hover:bg-gray-200 border border-black"
      } rounded-full`}
    >
      <IoMdHome
        className={`${theme === "dark" ? "text-white" : "text-black"}`}
      />
    </Button>
  );
};

export default BackButton;

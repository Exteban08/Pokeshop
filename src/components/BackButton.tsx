import { GrFormPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/useTheme";
import Button from "./Button";

const BackButton = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <Button
      onClick={() => navigate(-1)}
      className={`w-10 h-10 ${
        theme === "dark"
          ? "bg-gray-900 hover:bg-gray-800"
          : " bg-white hover:bg-gray-100"
      } rounded-full`}
    >
      <GrFormPrevious
        className={`${theme === "dark" ? "text-white" : "text-black"}`}
      />
    </Button>
  );
};

export default BackButton;

import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/useTheme';
import { FaMoon, FaShoppingCart } from 'react-icons/fa';
import { SiPokemon } from 'react-icons/si';
import { IoSunny } from 'react-icons/io5';
import { MdOutlineCatchingPokemon } from 'react-icons/md';
import Button from './Button';

interface HeaderProps {
  toggleCart: () => void;
}

const Header = ({ toggleCart }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  return (
    <div className="top-0 flex w-full items-center justify-between p-4">
      <div className="text-6xl">
        <SiPokemon className="text-black dark:text-white" />
      </div>
      <div className="hidden sm:block">
        <h1 className="text-2xl font-bold">Poke-shop</h1>
      </div>
      <div className="flex gap-2">
        <Button onClick={toggleTheme} className="h-8 w-10">
          {theme === 'light' ? <FaMoon /> : <IoSunny />}
        </Button>
        <Button onClick={() => navigate('/favorites')} className="h-8 w-10">
          <MdOutlineCatchingPokemon />
        </Button>
        <Button onClick={toggleCart} className="h-8 w-10">
          <FaShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Header;

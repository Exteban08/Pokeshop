import { GrFormPrevious } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(-1)}
      className="h-10 w-10 rounded-full bg-white hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800"
    >
      <GrFormPrevious className="text-2xl text-black dark:text-white" />
    </Button>
  );
};

export default BackButton;

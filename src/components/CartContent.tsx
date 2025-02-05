import { MdDelete } from 'react-icons/md';
import { useCartContext } from '../context/useCartContext';
import Button from './Button';
import clsx from 'clsx';
import { IoCloseSharp } from 'react-icons/io5';

interface CartContentProps {
  isCartOpen: boolean;
  toggleCart: () => void;
}

const CartContent = ({ isCartOpen, toggleCart }: CartContentProps) => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCartContext();

  return (
    <div
      className={clsx(
        'fixed top-0 right-0 h-full w-96 transform bg-white text-black shadow-lg transition-transform duration-300 ease-in-out dark:bg-gray-800 dark:text-white',
        {
          'translate-x-0 overflow-y-scroll': isCartOpen,
          'translate-x-full': !isCartOpen,
        },
      )}
    >
      <div className="flex flex-col bg-white p-6 text-black dark:bg-gray-800 dark:text-white">
        <Button
          onClick={toggleCart}
          className="absolute top-6 right-6 rounded-full p-2"
        >
          <IoCloseSharp />
        </Button>
        <h2 className="mb-4 text-xl font-bold">Carrito</h2>
        {Object.values(cart.items).length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          <>
            <ul>
              {Object.values(cart.items).map((item) => (
                <li key={item.pokemonName} className="mb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div>
                        <img src={item.pokemonImage} alt={item.pokemonName} />
                      </div>
                      <div className="flex flex-col">
                        <p className="font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="capitalize">{item.pokemonName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) => {
                          const newQuantity = Math.max(
                            1,
                            Number(e.target.value),
                          );
                          updateQuantity({
                            pokemonName: item.pokemonName,
                            quantity: newQuantity,
                          });
                        }}
                        className="w-14 rounded-lg border-2 p-1"
                      />
                      <Button
                        onClick={() => removeFromCart(item.pokemonName)}
                        className="h-8 w-8 bg-gray-500"
                      >
                        <MdDelete />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex w-full flex-col items-center gap-4">
              <Button
                onClick={() => console.log('Faltó agregar funcionalidad')}
                className="flex w-full rounded bg-orange-400 py-4 text-white"
              >
                <div className="flex w-full justify-between px-4">
                  <span className="font-semibold">Checkout</span>
                  <p className="font-bold">{`$${cart.total.toFixed(2)}`}</p>
                </div>
              </Button>
              <Button
                onClick={clearCart}
                className="flex w-full justify-between gap-1 rounded bg-gray-500 px-4 py-4 text-white"
              >
                <span>Vaciar carrito</span>
                <MdDelete size={20} />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartContent;

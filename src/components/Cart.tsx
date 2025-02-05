import { MdDelete } from 'react-icons/md';
import { useCartContext } from '../context/useCartContext';
import Button from './Button';

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCartContext();

  return (
    <div className="h-full bg-white p-4 text-black dark:bg-gray-800 dark:text-white">
      <h2 className="mb-4 text-xl font-bold">Carrito</h2>
      {Object.values(cart.items).length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <ul>
            {Object.values(cart.items).map((item) => (
              <li key={item.pokemonName} className="mb-2">
                <div className="flex items-center justify-between">
                  <span>
                    {item.pokemonName} $
                    {(item.price * item.quantity).toFixed(2)}
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => {
                        const newQuantity = Math.max(1, Number(e.target.value));
                        updateQuantity({
                          pokemonName: item.pokemonName,
                          quantity: newQuantity,
                        });
                      }}
                      className="w-14 rounded-lg border"
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
          <div className="mt-10 flex w-full flex-col items-center">
            <p className="font-bold">{`Total: $${cart.total.toFixed(2)}`}</p>
            <Button
              onClick={clearCart}
              className="mt-2 w-1/3 rounded bg-red-500 p-2 text-white"
            >
              Vaciar carrito
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

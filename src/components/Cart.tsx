import { usePokemonContext } from "../context/usePokemonContext";
import { useTheme } from "../context/useTheme";
import { MdDelete } from "react-icons/md";
import Button from "./Button";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = usePokemonContext();
  const { theme } = useTheme();

  return (
    <div
      className={`p-4 h-full ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">Carrito</h2>
      {cart.items.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <ul>
            {cart.items.map((item) => (
              <li key={item.pokemon.id} className="mb-2">
                <div className="flex justify-between items-center">
                  <span>
                    {item.pokemon.name} (x{item.quantity}) - $
                    {(item.pokemon.price * item.quantity).toFixed(2)}
                  </span>
                  <Button
                    onClick={() => removeFromCart(item.pokemon.id)}
                    className="bg-gray-500 w-8 h-8"
                  >
                    <MdDelete />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <p className="font-bold">{`Total: $${cart.total.toFixed(2)}`}</p>
            <Button
              onClick={clearCart}
              className="mt-2 p-2 bg-red-500 text-white rounded"
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

import { useTheme } from "../context/useTheme";
import { MdDelete } from "react-icons/md";
import Button from "./Button";
import { useCartContext } from "../context/useCartContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCartContext();
  const { theme } = useTheme();

  return (
    <div
      className={`p-4 h-full ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">Carrito</h2>
      {Object.values(cart.items).length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <ul>
            {Object.values(cart.items).map((item) => (
              <li key={item.pokemonName} className="mb-2">
                <div className="flex justify-between items-center">
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
                        updateQuantity({ pokemonName: item.pokemonName, quantity: newQuantity });
                      }}
                      className="w-14 border rounded-lg"
                    />
                    <Button
                      onClick={() => removeFromCart(item.pokemonName)}
                      className="bg-gray-500 w-8 h-8"
                    >
                      <MdDelete />
                    </Button>
                  </div>
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

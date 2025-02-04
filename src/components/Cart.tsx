import { usePokemonContext } from "../context/usePokemonContext";
import { useTheme } from "../context/useTheme";
import { MdDelete } from "react-icons/md";
import Button from "./Button";
import { Pokemon } from "../types/pokemon";

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } =
    usePokemonContext();
  const { theme } = useTheme();

  const handleQuantityChange = (pokemonId: number, quantity: number) => {
    const element = cart.items.find((item) => item.pokemon.id === pokemonId);

    if (!element) {
      console.error("Item not found in cart");
      return;
    }

    const newQuantity = Math.max(1, quantity);

    const pokemon: Pokemon = {
      id: element.pokemon.id,
      name: element.pokemon.name,
      price: element.pokemon.price,
    };

    updateQuantity(pokemon, newQuantity);
  };

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
                    {item.pokemon.name} - $
                    {(item.pokemon.price * item.quantity).toFixed(2)}
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => {
                        const newQuantity = Number(e.target.value);
                    
                        if (newQuantity >= 1) {
                          handleQuantityChange(item.pokemon.id, newQuantity);
                        } else {
                          e.target.value = item.quantity.toString();
                        }
                      }}
                      className="w-14 border rounded-lg"
                    />
                    <Button
                      onClick={() => removeFromCart(item.pokemon.id)}
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

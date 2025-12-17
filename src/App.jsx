import { useState } from "react";

function App() {
  const products = [
    { name: "Mela", price: 0.5 },
    { name: "Pane", price: 1.2 },
    { name: "Latte", price: 1.0 },
    { name: "Pasta", price: 0.7 },
  ];

  const [addedProducts, setAddedProducts] = useState([]);

  const addToCart = (product) => {
    const exist = addedProducts.find((item) => item.name === product.name);

    if (exist) {
      setAddedProducts(
        addedProducts.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setAddedProducts([...addedProducts, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productName) => {
    setAddedProducts(addedProducts.filter((item) => item.name !== productName));
  };

  let total = 0;

  addedProducts.forEach((product) => {
    total += product.price * product.quantity;
  });

  return (
    <>
      <h1>lista della spesa</h1>

      <ul>
        {products.map((p, i) => {
          return (
            <li key={i}>
              {p.name} , {p.price}$
              <button onClick={() => addToCart(p)}>Aggiungi al carrello</button>
            </li>
          );
        })}
      </ul>

      {addedProducts.length > 0 && (
        <>
          <h2>carrello</h2>

          <ul>
            {addedProducts.map((p, i) => {
              return (
                <li key={i}>
                  {p.name} {p.quantity} - {(p.price * p.quantity).toFixed(2)}€
                  <button onClick={() => removeFromCart(p.name)}>
                    Rimuovi
                  </button>
                </li>
              );
            })}
          </ul>
          <h3>Totale: {total.toFixed(2)}€</h3>
        </>
      )}
    </>
  );
}

export default App;

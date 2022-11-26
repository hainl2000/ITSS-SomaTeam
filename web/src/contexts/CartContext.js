import React, { useCallback, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import CartDrawer from '../components/CartDrawer';
import useLocalStorage from '../hooks/useLocalStorage';

const CartContext = React.createContext();

function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useLocalStorage('shopping_cart', {
    total: 0,
    products: []
  });

  const toggleCartOpen = useCallback(() => {
    setIsCartOpen((prev) => !prev);
  }, []);

  const addToCart = useCallback(
    (product, quantity = 1) => {
      const found = cart.products.find(({ id }) => id === product.id);
      if (found) {
        setCart((prev) => ({
          ...prev,
          total: prev.total + quantity,
          products: prev.products.map((currentProduct) => {
            if (currentProduct.id === product.id) {
              return {
                ...currentProduct,
                quantity: currentProduct.quantity + quantity
              };
            }
            return currentProduct;
          })
        }));
        return;
      }
      setCart((prev) => ({
        ...prev,
        total: prev.total + quantity,
        products: prev.products.concat({
          ...product,
          quantity: quantity
        })
      }));
    },
    [cart.products, setCart]
  );

  const getTotalAmount = useCallback(() => {
    let total = 0;
    cart.products.forEach(
      ({ quantity, price }) => (total += quantity * price)
    );
    return total;
  }, [cart.products]);

  const removeItemFromCart = useCallback(
    (id) => {
      const found = cart.products.find(
        (product) => product.id === id
      );

      setCart((prev) => ({
        ...prev,
        total: prev.total - found.quantity,
        products: prev.products.filter((product) => product.id !== id)
      }));
    },
    [cart.products, setCart]
  );

  const handleChangeQuantity = useCallback(
    (id, type) => {
      if (type === 'plus') {
        setCart((prev) => ({
          ...prev,
          total: prev.total + 1,
          products: prev.products.map((currentProduct) => {
            if (currentProduct.id === id) {
              return {
                ...currentProduct,
                quantity: currentProduct.quantity + 1
              };
            }
            return currentProduct;
          })
        }));
        return;
      }
      const found = cart.products.find(
        (product) => product.id === id
      );
      if (found.quantity > 1) {
        setCart((prev) => ({
          ...prev,
          total: prev.total - 1,
          products: prev.products.map((currentProduct) => {
            if (currentProduct.id === id) {
              return {
                ...currentProduct,
                quantity: currentProduct.quantity - 1
              };
            }
            return currentProduct;
          })
        }));
      }
    },
    [cart.products, setCart]
  );

  const resetCart = useCallback(() => {
    setCart((prev) => ({ ...prev, total: 0, products: [] }));
  }, [setCart]);

  return (
    <CartContext.Provider
      value={{
				cart,
        isCartOpen,
        toggleCartOpen,
        addToCart,
        getTotalAmount,
        removeItemFromCart,
        handleChangeQuantity,
        resetCart
      }}
    >
      <>
        <CartDrawer
          isOpen={isCartOpen}
          onClose={toggleCartOpen}
          cart={cart}
        />
        {children}
      </>
    </CartContext.Provider>
  );
}

const useCartContext = () => {
  const context = React.useContext(CartContext);

  if (context === undefined) {
    throw new Error(
      'useCartContext must be used within a CartProvider'
    );
  }

  return context;
};

CartProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default CartProvider;
export { useCartContext };

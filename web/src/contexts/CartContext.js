import React, { useCallback, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import CartDrawer from '../components/CartDrawer';
import useLocalStorage from '../hooks/useLocalStorage';

const CartContext = React.createContext();

function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useLocalStorage('shopping_cart', {
    // total: 0,
    products: []
  });

  const toggleCartOpen = useCallback(() => {
    setIsCartOpen((prev) => !prev);
  }, []);

  const addToCart = useCallback(
    (product, quantityOrder = 1) => {
      // console.log('he', quantityOrder);
      if (quantityOrder <= product?.quantity) {
        const found = cart.products.find(
          ({ id }) => id === product.id
        );
        if (found) {
          setCart((prev) => ({
            ...prev,
            // total:
            //   prev?.quantity_order < prev.quantity
            //     ? prev.total + quantityOrder
            //     : prev.total,
            products: prev.products.map((currentProduct) => {
              if (currentProduct.id === product.id) {
                return {
                  ...currentProduct,
                  quantity_order:
                    currentProduct.quantityOrder + quantityOrder
                };
              }
              return currentProduct;
            })
          }));
          return;
        }
        setCart((prev) => ({
          ...prev,
          // total: prev.total + quantityOrder,
          products: prev.products.concat({
            ...product,
            quantity_order: quantityOrder
          })
        }));
      }
    },
    [cart.products, setCart]
  );

  const getTotalAmount = useCallback(() => {
    let total = 0;
    cart.products.forEach(
      ({ quantity_order, price }) => (total += quantity_order * price)
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
        // total: prev.total - found.quantity_order,
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
          // total:
          //   prev?.quantity_order < prev?.quantity
          //     ? prev.total + 1
          //     : prev.total,
          products: prev.products.map((currentProduct) => {
            if (currentProduct.id === id) {
              return {
                ...currentProduct,
                quantity_order:
                  currentProduct?.quantity_order <
                  currentProduct?.quantity
                    ? currentProduct.quantity_order + 1
                    : currentProduct.quantity_order
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
      if (found.quantity_order > 1) {
        setCart((prev) => ({
          ...prev,
          // total: prev.total - 1,
          products: prev.products.map((currentProduct) => {
            if (currentProduct.id === id) {
              return {
                ...currentProduct,
                quantity_order: currentProduct.quantity_order - 1
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
    setCart((prev) => ({ ...prev, products: [] }));
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

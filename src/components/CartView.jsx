import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "boxicons";
import Swal from 'sweetalert2';

const CartView = () => {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartProducts(parsedCart);
    }
  }, []);

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }
    const updatedCart = [...cartProducts];
    updatedCart[index].quantity = newQuantity;
    setCartProducts(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeProduct = (index) => {
    const updatedCart = [...cartProducts];
    updatedCart.splice(index, 1);
    setCartProducts(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="cart-section">
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Unit price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>{""}</th>
          </tr>
        </thead>
        <tbody>
          {cartProducts.map((product, index) => (
            <tr key={index}>
              <td>
                <Link to={`/product/${product.id}`}>{product.title}</Link>
              </td>
              <td>${product.price}</td>
              <td>
                <input
                  className="cart-quantity"
                  type="number"
                  value={product.quantity}
                  onChange={(e) =>
                    updateQuantity(index, parseInt(e.target.value))
                  }
                />
              </td>
              <td>${product.price * product.quantity}</td>
              <td>
                <button onClick={() => {
                    removeProduct(index)
                    Swal.fire(
                        'product deleted!',
                        'The product was removed from the shopping cart!',
                        'success'
                      )
                }} className="delete-cart-product"><box-icon name='trash' type='solid' color='#ff0000' ></box-icon></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartView;

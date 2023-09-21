import React, { useEffect, useState } from "react";
import "boxicons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../store/slices/products.slice";
import Swal from 'sweetalert2';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    dispatch(getProductsThunk());
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (product) => {
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      updatedCart[existingProductIndex].quantity++;
    } else {
      const cartItem = { ...product, quantity: 1 };
      updatedCart.push(cartItem);
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const productRate = (rate) => {
    const integerPart = Math.floor(rate);
    const decimalPart = rate - integerPart;
    const percentageToColor = decimalPart * 100;
    return (
      <>
        <span className="half-star">
          <span
            className="colored"
            style={{
              width: `${rate >= 1 ? 100 : rate > 0 ? percentageToColor : 0}%`,
            }}
          >
            ★
          </span>
        </span>
        <span className="half-star">
          <span
            className="colored"
            style={{
              width: `${rate >= 2 ? 100 : rate > 1 ? percentageToColor : 0}%`,
            }}
          >
            ★
          </span>
        </span>
        <span className="half-star">
          <span
            className="colored"
            style={{
              width: `${rate >= 3 ? 100 : rate > 2 ? percentageToColor : 0}%`,
            }}
          >
            ★
          </span>
        </span>
        <span className="half-star">
          <span
            className="colored"
            style={{
              width: `${rate >= 4 ? 100 : rate > 3 ? percentageToColor : 0}%`,
            }}
          >
            ★
          </span>
        </span>
        <span className="half-star">
          <span
            className="colored"
            style={{
              width: `${rate === 5 ? 100 : rate > 4 ? percentageToColor : 0}%`,
            }}
          >
            ★
          </span>
        </span>
        <span className="card-rate">{rate}</span>
      </>
    );
  };

  return (
    <div>
      <div className="products-container">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <Link
              to={`/product/${product.id}`}
            >
              <img src={product.image} className="card-image" />
              <div className="card-details">
                <span className="card-title">{product.title}</span>
                <span className="card-price">${product.price}</span>
              </div>
              <div className="card-rate">
                {productRate(product.rating.rate)}
              </div>
            </Link>
            <button
              className="card-cart"
              onMouseDown={(e) => {
                e.stopPropagation();
                addToCart(product);
                Swal.fire(
                  'Product added!',
                  'the product has been added successfully',
                  'success'
                )
              }}
            >
              <box-icon name="cart" type="solid" color="#ffffff"></box-icon>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

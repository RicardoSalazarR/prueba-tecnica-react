import React, { useEffect, useState } from "react";
import "boxicons";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../store/slices/products.slice";
import Swal from 'sweetalert2';

const ProductDetails = () => {
  const [cart, setCart] = useState([]);
  const [localQuantity,setLocalQuantity] = useState(1)
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductsThunk());
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCart(parsedCart);
    }
  }, []);

  let product = {};
  for (const prod of products) {
    if (prod.id == id) {
      product = prod;
    }
  }
  const addToCart = (product) => {
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      updatedCart[existingProductIndex].quantity=updatedCart[existingProductIndex].quantity+parseInt(localQuantity);
    } else {
      const cartItem = { ...product, quantity: localQuantity };
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
    <div className="product-detail">
      <div className="main-information">
        <img className="product-image" src={product.image} alt="" />
        <div className="product-info">
          <h3 className="title product-title">{product.title}</h3>
          <p className="description">{product.description}</p>
          <span className="price-tag">Price: <span>${product.price}</span></span>
          <div className="add-cart">
            <div className="product-rate">
              {productRate(product.rating?.rate)}
            </div>
            <div className="add-cart-section">
              <input type="number"value={localQuantity} onChange={(e)=>e.target.value>=1&&setLocalQuantity(e.target.value)}/>
              <button className="btn-cart" onClick={() => {
                addToCart(product)
                Swal.fire(
                  'Product added!',
                  'the product has been added successfully',
                  'success'
                )
                }}>
                add to cart
                <box-icon name="cart" type="solid" color="#ffffff"></box-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

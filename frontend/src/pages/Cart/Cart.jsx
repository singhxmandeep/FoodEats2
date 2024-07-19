import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);

  const getCartItems = () => {
    return food_list.filter(item => cartItems[item._id] > 0);
  };

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {getCartItems().map((item) => (
          <React.Fragment key={item._id}>
            <div className="cart-items-item">
              <img src={url+"/images/"+item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>${item.price.toFixed(2)}</p>
              <p>{cartItems[item._id]}</p>
              <p>${(item.price * cartItems[item._id]).toFixed(2)}</p>
              <p className="cross" onClick={() => removeFromCart(item._id)}>X</p>
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === "0.00" ? "0.00" : "2.00"}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${(parseFloat(getTotalCartAmount()) + (getTotalCartAmount() === "0.00" ? 0 : 2)).toFixed(2)}</b>            
            </div>
          </div>
          <button onClick={() => navigate("/order")}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

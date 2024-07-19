import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { StoreContext } from "../../Context/StoreContext";
import "./PlaceOrder.css";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (parseFloat(getTotalCartAmount()) === 0) {
      navigate("/cart");
    }
  }, [token]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    
    const isValid = Object.values(data).every(field => field.trim() !== "");
    if (!isValid) {
      alert("Please fill all fields");
      return;
    }
    
    const orderItems = food_list
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({ ...item, quantity: cartItems[item._id] }));

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
      if (response.data.success) {
        window.location.replace(response.data.session_url);
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Order placement failed:", error.response ? error.response.data : error);
      alert("An error occurred while placing the order: " + (error.response ? error.response.data.message : "Unknown error"));
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
        <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" />
        <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name" />
        </div>

        <input required type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder="Email adress" />
        <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
          <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip code" />
          <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
        </div>
        <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone"/>
      </div>
      <div className="place-order-right">
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
          <button type="submit" >PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
        Indulge in our diverse selection of mouth-watering dishes, crafted with
        the finest ingredients to tantalize your taste buds. From appetizers to
        desserts, find your favorite flavors and discover new ones to love.
        Order now and enjoy a culinary journey from the comfort of your home.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index)=>{
            return (
                <div onClick={()=>{setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}} key={index} className="explore-menu-list-item">
                    <img className={category===item.menu_name? "active":""} src={item.menu_image} alt="item_menu_image" />
                    <p>{item.menu_name}</p>
                </div>
            )
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;

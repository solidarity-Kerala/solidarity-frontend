import { useState } from "react";
import SetupMenu from "../setupMenu";
import FoodExchangeSetupMenu from "../FoodExchangeSetupMenu";

const MenuNavigator = (props) => {
  const [menuData] = useState(props.openData.data);
  console.log(menuData);
  switch (menuData.subDiet.category) {
    case "FoodExchange":
      return <FoodExchangeSetupMenu {...props} />;
    default:
      return <SetupMenu {...props} />;
  }
};
export default MenuNavigator;

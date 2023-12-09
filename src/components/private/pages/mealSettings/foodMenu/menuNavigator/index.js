import { useState } from "react";
import SetupMenu from "../setupMenu";
// import FoodExchangeSetupMenu from "../FoodExchangeSetupMenu";

const MenuNavigator = (props) => {
  const [menuData] = useState(props.openData.data);
  switch (menuData.subDiet.category) {
    case "FoodExchange":
      return <SetupMenu {...props} />;
    default:
      return <SetupMenu {...props} />;
  }
};
export default MenuNavigator;

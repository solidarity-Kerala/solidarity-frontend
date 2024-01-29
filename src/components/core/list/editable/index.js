import React, { useState } from "react";
import FormInput from "../../input";

const Editable = ({ item }) => {
  const [selected, setSelected] = useState("");

  const filterChange = (option) => {
    setSelected(option);
  };
  return <FormInput customClass={"filter"} placeholder={item.placeHolder} value={selected} key={`input` + 0} id={item.name} {...item} onChange={filterChange} />;
};

export default Editable;

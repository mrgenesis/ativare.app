import React from "react";
import CustomSelect from '../../Utils/CustomSelect';

const ProductSelect = ({ selectedValue, placeholder, list, setSelectedValue }) => {
  const props = { selectedValue, placeholder, list, setSelectedValue };
  if (Array.isArray(list)) {    
    return <CustomSelect { ...props } propertyValueInMap='code' propertyDisplayInMap='name' />
  }
  return list;
}

export default ProductSelect;

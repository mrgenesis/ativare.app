import React from "react";
import CustomSelect from '../../Utils/CustomSelect';

const LocationSelect = ({ selectedValue, placeholder, locations, setSelectedValue, selectedFloor }) => {

  const itemsKeysList = Object.keys(locations);
  const filteredItemsKeysList = itemsKeysList.filter(key => locations[key].floor === selectedFloor);
  const list = filteredItemsKeysList.map(key => {
    return { key, ...locations[key] };
  });

  const props = { selectedValue, placeholder, list, setSelectedValue };
  if (Array.isArray(list)) {    
    return <CustomSelect { ...props } propertyValueInMap='locationName' propertyDisplayInMap='key' />
  }
  return list;
}

export default LocationSelect;

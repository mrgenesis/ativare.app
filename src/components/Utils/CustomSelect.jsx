import React from "react";
import { Select, FormControl, MenuItem } from "@material-ui/core/";
import createUUID from "../../helper/uuid";

const CustomSelect = ({ selectedValue, placeholder, setSelectedValue, list, propertyValueInMap, propertyDisplayInMap }) => {

  const handleChange = e => {
    setSelectedValue(e.target.value);
  };

  return (
    <div>
      <FormControl fullWidth>
        <Select displayEmpty value={selectedValue} onChange={handleChange}>
          <MenuItem disabled value="">
            <em>{placeholder}</em>
          </MenuItem>
          {
            list.map(item => (
              <MenuItem key={createUUID()} value={(propertyValueInMap) ? item[propertyValueInMap] : item }>
                {item[propertyDisplayInMap]}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </div>
  );
};

export default CustomSelect;

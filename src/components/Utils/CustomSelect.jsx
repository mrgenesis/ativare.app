import React from "react";
import { Select, FormControl, MenuItem, FormHelperText } from "@material-ui/core/";
import createUUID from "../../helper/uuid";

const CustomSelect = ({ selectedValue, placeholder, setSelectedValue, list, propertyValueInMap, propertyDisplayInMap, error, errorMessage }) => {

  const handleChange = e => {
    setSelectedValue(e.target.value);
  };

  return (
    <div>
      <FormControl fullWidth>
        <Select 
          displayEmpty 
          value={selectedValue} 
          onChange={handleChange} 
          error={error}
        >
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
        {error ? <FormHelperText error={error}>{errorMessage}</FormHelperText> : ''}
      </FormControl>
    </div>
  );
};

export default CustomSelect;

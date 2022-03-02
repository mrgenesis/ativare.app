import React from "react";
import { Select, FormControl, MenuItem } from "@material-ui/core/";

const Selector = ({ locations, selectedFloor, selectedLocation, setLocation, placeholder }) => {

  const itemsKeysList = Object.keys(locations);
  const list = itemsKeysList.filter(key => locations[key].floor === selectedFloor);

  const handleChange = e => {
    setLocation(e.target.value);
  };

  return (
    <div>
      <FormControl fullWidth>
        <Select displayEmpty value={selectedLocation} onChange={handleChange}>
          <MenuItem disabled value="">
            <em>{placeholder}</em>
          </MenuItem>
          {
            list.map(key => (
              <MenuItem key={key} value={locations[key].locationName}>
                {key}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </div>
  );
};

export default Selector;

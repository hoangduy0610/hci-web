import React, { useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import "./CustomDropdown.scss";

interface CustomDropdownProps {
  label: string;
  options: string[];
  onSelect: (selected: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ label, options, onSelect }) => {
  const [value, setValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  interface HandleClickProps {
    (selectedVal: string | null): void;
  }

  const handleClick: HandleClickProps = (selectedVal) => {
    if (selectedVal) {
      setSelectedValue(selectedVal);
      onSelect(selectedVal);
    }
  };

  return (
    <>
      <label className="item-search-label"> {label}</label>
      <Dropdown className="dropdown-custom" onSelect={handleClick}>
        <Dropdown.Toggle id="dropdown-custom-components">
         <span>{selectedValue ? selectedValue : label}</span> 
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Form.Control
            autoFocus
            className=" my-1"
            placeholder="Search..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">

            {options
              .filter(
                (option) =>
                  !value || option.toLowerCase().startsWith(value.toLowerCase())
              )
              .map((option, index) => (
                <li  key={index}>

                <Dropdown.Item eventKey={option}>
                  {option}
                </Dropdown.Item>
                </li>
              ))}
          </ul>
        </Dropdown.Menu>
      </Dropdown>
      
    </>
  );
};

export default CustomDropdown;
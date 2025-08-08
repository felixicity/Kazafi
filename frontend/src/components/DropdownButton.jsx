import { useState } from "react";

const DropdownButton = ({ icon, options, initialOption }) => {
      const [buttonText, setButtonText] = useState(initialOption);
      const [showDropdown, setShowDropdown] = useState(false);

      const handleClick = (option) => {
            setButtonText(option);
            setShowDropdown(false);
      };

      return (
            <div className="special-btn">
                  <div className={`rounded-btn ${buttonText}`} onClick={() => setShowDropdown(!showDropdown)}>
                        <span>{buttonText}</span>
                        {icon}
                  </div>
                  {showDropdown && (
                        <div className="options">
                              <ul>
                                    {options.map((option) => (
                                          <li key={option} onClick={() => handleClick(option)}>
                                                <span className={option}>{option}</span>
                                          </li>
                                    ))}
                              </ul>
                        </div>
                  )}
            </div>
      );
};

export default DropdownButton;

import { useState } from "react";
import { FiEdit2, FiTrash2, FiCalendar, FiActivity } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SplitButton = () => {
      const navigate = useNavigate();

      const [showPopOver, setShowPopOver] = useState(false);
      const options = [
            { icon: <FiEdit2 />, action: "Edit", path: "" },
            { icon: <FiTrash2 />, action: "Delete", path: "" },
            { icon: <FiActivity />, action: "Activate", path: "" },
            { icon: <FiCalendar />, action: "Schedule for later", path: "" },
      ];

      return (
            <>
                  <div className="gui-split-button">
                        <button onClick={() => navigate("./234/edit")}>Edit</button>
                        <span
                              className="gui-popup-button"
                              aria-haspopup="true"
                              aria-expanded="false"
                              title="Open for more actions"
                              onClick={() => setShowPopOver(!showPopOver)}
                        >
                              <svg aria-hidden="true" viewBox="0 0 20 20">
                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                              </svg>
                              <ul className="gui-popup" style={{ opacity: showPopOver ? 1 : 0 }}>
                                    {options.map((option) => {
                                          return (
                                                <li key={option.action}>
                                                      <button>
                                                            {option.icon} <span>{option.action}</span>
                                                      </button>
                                                </li>
                                          );
                                    })}
                              </ul>
                        </span>
                  </div>
            </>
      );
};

export default SplitButton;

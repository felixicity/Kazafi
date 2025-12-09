import { FaTimes } from "react-icons/fa";

const Modal = ({
      title,
      text,
      buttonSecondaryText,
      buttonPrimaryText,
      icon,
      isOpen,
      onClose,
      children,
      primaryTask,
      secondaryTask,
}) => {
      const handleClose = () => {
            if (secondaryTask) {
                  console.log(secondaryTask);
            }
            onClose();
      };

      const handleClick = () => {
            if (primaryTask) {
                  console.log(primaryTask);
            }
            onClose();
      };

      if (!isOpen) return null;

      return (
            <div className="modal-overlay">
                  <div className="modal-content">
                        <button className="modal-close" onClick={onClose} aria-label="Close">
                              <FaTimes size={18} />
                        </button>
                        <h2 className="modal-title">{title}</h2>
                        <p className="modal-text">{text}</p>
                        {children}
                        <div className="modal-buttons">
                              <button className="btn btn-secondary" onClick={handleClose}>
                                    {buttonSecondaryText}
                              </button>
                              <button className="btn btn-primary" onClick={handleClick}>
                                    {icon} <span>{buttonPrimaryText}</span>
                              </button>
                        </div>
                  </div>
            </div>
      );
};

export default Modal;

const Button = ({ className, backgroundColor, text, onclick }) => {
      return (
            <button className={className} style={{ backgroundColor }} onClick={onclick}>
                  {text}
            </button>
      );
};

export default Button;

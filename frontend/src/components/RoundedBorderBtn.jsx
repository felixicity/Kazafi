const RoundedBorderBtn = ({ icon, text, onclick }) => {
      return (
            <div className="special-btn" onClick={onclick}>
                  <div className={`rounded-btn ${text}`} href={""}>
                        {icon}
                        <span>{text}</span>
                  </div>
            </div>
      );
};

export default RoundedBorderBtn;

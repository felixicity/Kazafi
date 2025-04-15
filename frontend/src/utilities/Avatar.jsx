import "../css/utilities/avatar.css";

const Avatar = ({ username, onclick }) => {
      return (
            <div className="avatar" onClick={onclick}>
                  {username}
            </div>
      );
};

export default Avatar;

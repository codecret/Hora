const Button = ({ text, classNameCustom, handleClick, buttonType }) => {
  return (
    <button
      type={buttonType}
      className={`mybtn ${classNameCustom}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;

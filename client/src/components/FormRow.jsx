export const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  isLabelThere,
  divClassName,
  className,
  label,
  required,
}) => {
  return (
    <div id="search-field" className={`${divClassName}`}>
      {isLabelThere && (
        <label htmlFor="name" className="labelStyle">
          {label}
          {required && <span className={`${required}`}>*</span>}
        </label>
      )}
      {
        <input
          type={type}
          value={value}
          name={name}
          onChange={handleChange}
          className={`form-input inputLogin ${className}`}
          placeholder={labelText}
        />
      }
    </div>
  );
};

export default FormRow;
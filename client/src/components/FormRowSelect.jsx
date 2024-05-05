const FormRowSelect = ({
  labelText,
  name,
  value,
  handleChange,
  list,
  classDiv,
  classSelect,
  required,
}) => {
  return (
    <div className={`formRow ${classDiv}`}>
      {labelText && (
        <label htmlFor={name} className="form-label">
          {labelText || name}
          {required && <span className={`${required}`}>*</span>}
        </label>
      )}

      <select
        name={name}
        value={value}
        onChange={handleChange}
        className={`btn btn-block submit-btn select customBtn ${classSelect}`}
      >
        {list?.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormRowSelect;

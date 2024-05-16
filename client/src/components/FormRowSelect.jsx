import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  return (
    <div className={`formRow ${classDiv}`}>
      {labelText && (
        <label htmlFor={name} className="form-label">
          {t(labelText) || t(name)}
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
              {t(itemValue)}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormRowSelect;

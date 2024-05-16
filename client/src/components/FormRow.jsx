import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  return (
    <div id="search-field" className={`${divClassName}`}>
      {isLabelThere && (
        <label htmlFor={name} className="labelStyle">
          {t(label)}
          {required && <span className={`${required && "required"}`}>*</span>}
        </label>
      )}
      {
        <input
          type={type}
          value={value || ""}
          name={name}
          onChange={handleChange}
          className={`inputLogin ${className}`}
          placeholder={t(labelText)}
          autoComplete={type === "password" ? "on" : "off"}
        />
      }
    </div>
  );
};

export default FormRow;

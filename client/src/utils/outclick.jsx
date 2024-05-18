export const handleIconClick = ({ setShowLanguage, setShowLogout }) => {
  setShowLanguage((prevShowLanguage) => !prevShowLanguage);
  if (setShowLogout) {
    setShowLogout(false);
  }
};
export const handleUserDropdownClick = ({ setShowLanguage, setShowLogout }) => {
  setShowLogout((prevShowLogout) => !prevShowLogout);
  setShowLanguage(false);
};

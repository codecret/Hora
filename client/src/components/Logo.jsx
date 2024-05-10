import horaLogo from "/horaLogo.png";

const Logo = () => {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
      <img src={horaLogo} alt="logo" className="horaLogoImg" />
      <span className="horaLogoHeader">Hora</span>
    </div>
  );
};

export default Logo;

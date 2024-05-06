import BeatLoader from "react-spinners/BeatLoader";

const override = {
  display: "block",
  margin: "auto",
};
const Loader = () => {
  return (
    <BeatLoader
      color="var(--primary-color)"
      cssOverride={override}
      size={30}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loader;

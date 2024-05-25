import BeatLoader from "react-spinners/BeatLoader";

const override = {
  display: "block",
  margin: "auto",
  width: "fit-content",
};
const Loader = ({ center }) => {
  return (
    <div className={center ? "loading loading-center" : "loading"}>
      <BeatLoader
        color="var(--primary-color)"
        cssOverride={override}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;

import css from "./Loader.module.css";
import PropTypes from "prop-types";

// <LoaderUI show={bool} noText={hides word loading}  />

function Loader(props) {
  if (props.show === false) return null;

  return (
    <div className={css.wrapper}>
      {!props.noText && <h3 className={css.title}>Loading</h3>}
      <div className={css.loader}></div>
    </div>
  );
}

Loader.propTypes = {
  show: PropTypes.bool,
  noText: PropTypes.bool,
};

export default Loader;

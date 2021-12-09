import css from "./Input.module.css";

const Input = ({ error, type = "text", ...rest }) => {
  return (
    <div className={css["input-group"]}>
      {type !== "textarea" ? (
        <input
          className={css.input + " " + (error ? css["error-field"] : "")}
          type={type}
          {...rest}
        />
      ) : (
        <textarea
          className={css.input + " " + (error ? css["error-field"] : "")}
          {...rest}
        ></textarea>
      )}
      {error && <span className={css["error-message"]}>{error}</span>}
    </div>
  );
};

export default Input;

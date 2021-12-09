import css from "./Button.module.css";

function Button(props) {
  return (
    <button onClick={props.onClick} type={props.type} className={css.btn}>
      {props.children}
    </button>
  );
}
export default Button;

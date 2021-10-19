import { forwardRef } from "react";
import styles from "../../styles/Input/Input.module.css";

const Input = forwardRef((props, ref) => {
  return (
    <div className={styles.input}>
      <label className={styles["input__label"]}>{props.label}</label>
      <input ref={ref} className={styles["input__field"]} {...props.input} />
    </div>
  );
});

export default Input;

import React from "react";
import styles from "./Input.module.css";

const Input = ({
  type,
  label,
  value,
  name,
  id,
  onChange,
  onBlur,
  checked,
  error
}) => {
  return (
    <label htmlFor={id} className={styles.label}>
      {label}
      <input
        className={styles.input}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        checked={checked}
      />
      {error &&
        <p
          style={{
            color: "#FF9284",
            fontSize: "14px",
            padding: "15px 0",
            textAlign: "center"
          }}
        >
          {error}
        </p>}
    </label>
  );
};

export default Input;

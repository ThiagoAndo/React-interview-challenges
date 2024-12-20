// Input Validation Challenge:
/**
 * 1. Create a Form UI with input fields for:
 *    - Email
 *    - Password
 * 2. Add placeholder messages for validation rules:
 *    - Valid email format.
 *    - Password should have a minimum of 8 characters, including a number and a special character.
 * Bonus:
 * - Add dynamic error messages for invalid inputs.
 */
import React from "react";
import styles from "./inputValidation.module.css";
import { forwardRef, useState, useRef} from "react";

const FormInput = forwardRef((props, ref) => {
  return <input ref={ref} className={props.thisStyle} {...props} required />;
});

const InputValidationUI = () => {
  const emailRef= useRef();
  const passwordRef = useRef();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Form Validation</h1>
      <FormInput
        type="email"
        placeholder="Enter your email"
        thisStyle={styles.inputField}
      />
      <FormInput
        type="password"
        placeholder="Enter your password"
        thisStyle={styles.inputField}
      />
      <button className={styles.button}>Submit</button>
      <div className={styles.validationMessages}>
        <p>Validation messages will appear here...</p>
      </div>
    </div>
  );
};

export default InputValidationUI;

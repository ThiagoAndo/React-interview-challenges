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
import { forwardRef, useState, useRef, useEffect } from "react";

// const FormInput = forwardRef((props, ref) => {
//   return <input ref={ref} className={props.thisStyle} {...props} />;
// });

// const InputValidationUI = () => {
//   const emailRef = useRef();
//   const passwordRef = useRef();
//   const [err, setErr] = useState([]);
//   const errArr = [];
//   const handleSubmit = () => {
//     emailRef.current.value.trim().length === 0 && errArr.push("Email is required") ;
//     passwordRef.current.value.trim().length === 0&& errArr.push("Password is required");
//     !emailRef.current.value.trim().includes("@") && errArr.push("Email is wromg") ;
//     !emailRef.current.value.trim().length <5 && errArr.push("Password must be at leadt 5 characters") ;
//     errArr.length > 0 && setErr(errArr);
//   };

//   useEffect(() => {
//     const time = setTimeout(() => {
//       setErr([]);
//     }, 3000);

//     return () => {
//       clearTimeout(time);
//     };
//   }, [err]);

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Form Validation</h1>
//       <FormInput
//         type="email"
//         placeholder="Enter your email"
//         thisStyle={styles.inputField}
//         ref={emailRef}
//       />
//       <FormInput
//         type="password"
//         placeholder="Enter your password"
//         thisStyle={styles.inputField}
//         ref={passwordRef}
//       />
//       <button className={styles.button} onClick={handleSubmit}>
//         Submit
//       </button>
//       <div className={styles.validationMessages}>
//         {err && err.map((msg) => <p key={msg}>{msg}</p>)}
//       </div>
//     </div>
//   );
// };
const InputValidationUI = () => {
  const [inp, setInp] = useState({ email: "", password: "" });
  const [err, setErr] = useState([]);
  const errArr = [];

  const handleChange = (e) => {
    setInp((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = () => {
    inp.email.trim().length === 0 && errArr.push("Email is required");
    inp.password.trim().length === 0 && errArr.push("Password is required");
    if (errArr.length > 0) {
      setErr(errArr);
      return;
    }
    !inp.email.trim().includes("@") && errArr.push("Email is wrong");
    !inp.password.trim().length < 5 &&
      errArr.push("Password must be at leadt 5 characters");
  };

  useEffect(() => {
    const time = setTimeout(() => {
      setErr([]);
    }, 3000);

    return () => {
      clearTimeout(time);
    };
  }, [err]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Form Validation</h1>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        className={styles.inputField}
        defaultValue={inp.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        className={styles.inputField}
        defaultValue={inp.password}
        onChange={handleChange}
      />
      <button className={styles.button} onClick={handleSubmit}>
        Submit
      </button>
      <div className={styles.validationMessages}>
        {err && err.map((msg) => <p key={msg}>{msg}</p>)}
      </div>
    </div>
  );
};
export default InputValidationUI;

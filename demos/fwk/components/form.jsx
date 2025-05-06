import * as React from "react";
import { useForm } from "react-hook-form";
import cn from "classnames";
import styles from "./form.module.css";

export default React.forwardRef(({ onSubmit, submitting }, ref) => {
  const { register, handleSubmit, resetField, setFocus, formState: { errors } } = useForm();

  React.useImperativeHandle(ref, () => ({
    clear: () => {
      resetField("email");
      setFocus("email");
    },
    focus: () => {
      setFocus("email");
    },
  }), [setFocus, resetField]);

  const inputProps = register("email", {
    required: true,
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "invalid email address"
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <input className={cn(styles.input, {
        [styles.input__invalid]: Boolean(errors.email)
      })} {...inputProps} placeholder="Your email..." />

      <button className={styles.button} disabled={submitting} type="submit">
        {submitting ? "Subscribbing..." : "Subscribe"}
      </button>

    </form>
  );
});

import { IErrorsProps, IloginProps, IRegisterErrors, IRegisterProps } from "@/interfaces/Card.types";

export function validateLoginForm(values: IloginProps) {
  const errors: IErrorsProps = {};
  if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email is not valid";
  }
  return errors;
}
export function validateRegisterForm(values: IRegisterProps) {
    const errors: IRegisterErrors = {};
    if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is not valid";
    }
    return errors;
  }


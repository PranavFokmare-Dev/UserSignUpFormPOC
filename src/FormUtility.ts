import { IUserForm } from "./UserSignUp";
export interface FormErrors {
  userName: string[];
  pw: string[];
  confirmPw: string[];
  emailId: string[];
  phoneNum: string[];
}
export default function validateFormData(formData: IUserForm) {
  const errors: FormErrors = {
    userName: [],
    pw: [],
    confirmPw: [],
    emailId: [],
    phoneNum: []
  };
  if (formData.userName === "") {
    errors.userName.push("User Name cant be empty");
  } else if (formData.userName.length < 5) {
    errors.userName.push("User Name must have more than 5 chars");
  }

  if (formData.pw === "") {
    errors.pw.push("Password  cant be empty");
  } else if (formData.pw.length < 10) {
    errors.pw.push("Password must have more than 10 chars");
  }

  if (formData.confirmPw === "") {
    errors.confirmPw.push("Confirm Password  cant be empty");
  } else if (formData.confirmPw.length < 10) {
    errors.confirmPw.push("Confirm Password must have more than 10 chars");
  }
  if (formData.confirmPw !== formData.pw) {
    errors.confirmPw.push("Confirm password must be same as Password");
  }

  if (formData.phoneNum === "") {
    errors.phoneNum.push("phoneNum  cant be empty");
  } else if (formData.phoneNum.length !== 10) {
    errors.phoneNum.push("phoneNum must have more than 10 chars");
  }

  if (formData.emailId === "") {
    errors.emailId.push("emailId cant be empty");
  } else {
    if (formData.emailId.length < 10) {
      errors.emailId.push("emailId must have more than 10 chars");
    }
    if (!formData.emailId.includes("@")) {
      errors.emailId.push("email Id is invalid");
    }
  }
  return errors;
}

export function hasErrors(errors: FormErrors) {
  const values = Object.values(errors);
  return !values.reduce((isError, val) => isError && val.length === 0, true);
}

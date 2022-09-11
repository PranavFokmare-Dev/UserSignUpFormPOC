import React, { createContext, useContext, useState } from "react";

import validateFormData, { hasErrors, FormErrors } from "./FormUtility";

export interface IUserForm {
  userName: string;
  pw: string;
  confirmPw: string;
  emailId: string;
  phoneNum: string;
}
const newUserForm: IUserForm = {
  userName: "",
  pw: "",
  confirmPw: "",
  emailId: "",
  phoneNum: ""
};
interface IFormContext extends IUserForm {
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  blurHandler : (event : React.FocusEvent<HTMLInputElement>) => void;
  touched:formFields[];
  
  errors?:FormErrors
}

const formContext = createContext<IFormContext>({
  ...newUserForm,
  changeHandler: (event) => {},
  blurHandler:(event)=>{},
  touched:[]
});
type formFields = "userName" | "pw" | "confirmPw" | "emailId" | "phoneNum";
function Input({
  type,
  id,
  label
}: {
  type: string;
  id: formFields;
  label: string;
}) {
  const form = useContext(formContext);
  return (
    <>
      <label>{label}</label>
      <input style ={{height:"1.5em"}}
        type={type}
        id={id}
        value={form[id]}
        onChange={form.changeHandler}
        onBlur = {form.blurHandler}
      />
      <div>
        {form.touched.includes(id) && form.errors && form.errors[id].length>0
        &&form.errors[id].map(e => <h6>{e}</h6>)
        }
      </div>
    </>
  );
}
function DisplayErrors({ errors }: { errors: FormErrors }) {
  const keys: formFields[] = Object.keys(errors) as formFields[];
  return (
    <div>
      {keys.map((k) =>
        errors[k].map((error) => <h6 key={`${k}_${error}`}>{error}</h6>)
      )}
    </div>
  );
}
enum formStateEnum {
  Submitted,
  None,
  iSubmitting
}
export function UserSignUp() {
  const [formData, setFormData] = useState<IUserForm>(newUserForm);
  const [formState, setFormState] = useState<formStateEnum>(formStateEnum.None);
  const [touched,setTouched] = useState<formFields[]>([]);

  const errors = validateFormData(formData);
  const isError = hasErrors(errors);

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  }

  function submitHandler() {
    if (!isError) console.log("Form submited");
    else console.log("error occured");
    setFormState(formStateEnum.Submitted)
  }

  function blurHandler(event : React.FocusEvent<HTMLInputElement>){
    setTouched([...touched,event.target.id as formFields]);
  }

  return (
    <formContext.Provider value={{ ...formData, changeHandler, blurHandler,touched,errors }}>
      {isError && formState === formStateEnum.Submitted && (
        <DisplayErrors errors={errors} />
      )}
      <form style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
        <Input type="text" id="userName" label="User name" />
        <Input type="text" id="emailId" label="EmailId" />
        <Input type="text" id="phoneNum" label="Phone num" />
        <Input type="password" id="pw" label="Password" />
        <Input type="password" id="confirmPw" label="Confirm password" />
      </form>
      <button onClick={submitHandler}>Submit</button>
    </formContext.Provider>
  );
}

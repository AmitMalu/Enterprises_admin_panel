// components/FormikTextInput.tsx
import { useField } from "formik";
import TextInputComponent from "../Atoms/TextInputComponent";

const FormikTextInputComponent = ({ name, ...props }: any) => {
  const [field, meta] = useField(name);

  return (
    <TextInputComponent
      {...field}
      {...props}
      error={meta.touched && meta.error}
    />
  );
};

export default FormikTextInputComponent;

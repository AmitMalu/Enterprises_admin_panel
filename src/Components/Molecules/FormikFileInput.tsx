import { useField, useFormikContext } from "formik";
import FileInputComponent from "../Atoms/FileInputComponent";

const FormikFileInput = ({ name , ...props }: any) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  return (
    <FileInputComponent
      {...props}
      name={name}
      value={field.value}
      onChange={(file) => setFieldValue(name, file)}
      error={meta.touched && meta.error}
    />
  );
};

export default FormikFileInput;

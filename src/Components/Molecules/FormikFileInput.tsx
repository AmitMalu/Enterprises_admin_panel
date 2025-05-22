import { useField, useFormikContext } from "formik";
import { FileInput } from "@mantine/core";

const FormikFileInput = ({ name , ...props }: any) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  return (
    <FileInput
      {...props}
      name={name}
      value={field.value}
      onChange={(file) => setFieldValue(name, file)}
      error={meta.touched && meta.error}
    />
  );
};

export default FormikFileInput;

import { useField, useFormikContext } from "formik";
import { ColorInput, ColorInputProps } from "@mantine/core";

const FormikColorInput = ({ name, ...props }: ColorInputProps & { name: string }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  return (
    <ColorInput
      {...props}
      name={name}
      format="hex"
      withPicker
      value={field.value ?? ""}
      onChange={(val) => setFieldValue(name, val)}
      error={meta.touched && meta.error}
    />
  );
};

export default FormikColorInput;

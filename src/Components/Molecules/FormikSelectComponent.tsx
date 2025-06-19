import React from "react";
import { useField, useFormikContext } from "formik";
import SelectComponent from "../Atoms/SelectComponent";

const FormikSelectComponent = ({ name, ...props }: any) => {
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext<any>();

  // Normalize value to string if it's boolean
  const currentValue =
    typeof field.value === "boolean" ? String(field.value) : field.value;

  return (
    <SelectComponent
      {...field}
      {...props}
      value={currentValue}
      error={meta.touched && meta.error}
      onChange={(value: string) => {
        // Convert string "true"/"false" to actual boolean
        const finalValue =
          value === "true" ? true : value === "false" ? false : value;
        setFieldValue(name, finalValue);
      }}
      onBlur={() => setFieldTouched(name, true)}
    />
  );
};

export default FormikSelectComponent;

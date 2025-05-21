// components/Molecules/FormikSelectComponent.tsx
import React from "react";
import { useField, useFormikContext } from "formik";
import SelectComponent from "../Atoms/SelectComponent";

const FormikSelectComponent = ({ name, ...props }: any) => {
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext<any>();

  return (
    <SelectComponent
      {...field}
      {...props}
      value={field.value}
      error={meta.touched && meta.error}
      onChange={(value) => setFieldValue(name, value)}
      onBlur={() => setFieldTouched(name, true)}
    />
  );
};

export default FormikSelectComponent;

import React from "react";
import { useField, useFormikContext } from "formik";
import SwitchComponent from "../Atoms/SwitchComponent";

const FormikSwitchComponent = ({ name, ...props }: any) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext<any>();

  return (
    <SwitchComponent
      {...field}
      {...props}
      checked={field.value}
      error={meta.touched && meta.error}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        setFieldValue(name, event.currentTarget.checked)
      }
    />
  );
};

export default FormikSwitchComponent;

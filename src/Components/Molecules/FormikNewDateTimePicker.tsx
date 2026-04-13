import { useField, useFormikContext } from "formik";
import NewDateTimePicker from "../Atoms/NewDateTimePicker";

interface FormikNewDateTimePickerProps {
    name: string;
    label?: string;
    required?: boolean;
    [key: string]: any;
}

const FormikNewDateTimePicker = ({
    name,
    ...props
}: FormikNewDateTimePickerProps) => {
    const [field, meta] = useField(name);
    const { setFieldValue, setFieldTouched } = useFormikContext<any>();

    return (
        <NewDateTimePicker
            {...props}
            value={field.value || null}
            onChange={(value: Date | null) => setFieldValue(name, value)}
            error={meta.touched && meta.error ? meta.error : undefined}
            onBlur={() => setFieldTouched(name, true)}
        />
    );
};

export default FormikNewDateTimePicker;
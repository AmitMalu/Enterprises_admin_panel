import SelectComponent from "../Atoms/SelectComponent";
import TextInputComponent from "../Atoms/TextInputComponent";
import TextComponent from "../Atoms/TextComponent";

const SchemeConfigurationForm = () => {
  return (
    <>
      <TextComponent
        color="#1D1F2C"
        fontFamily="Inter"
        fontWeight={500}
        fontSize={18}
      >
        Scheme Configuration
      </TextComponent>
      <div className="bg-white p-2 md:p-4 rounded-lg shadow-md mt-1 md:mt-4 flex flex-col gap-2 md:gap-4 ">
        <TextInputComponent
          name="slabSize"
          label="Slab Size"
          placeholder="10,00,00"
          onChange={() => {}}
          value=""
          size="sm"
        />

        <SelectComponent
          data={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
          name="includingChargesInTotalAmount"
          label="Including Chargs in total Amount"
          placeholder="Select One"
          onChange={() => {}}
          value=""
          size="sm"
        />

        <SelectComponent
          data={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
          size="sm"
          name="debitChargesOnTotalAmount"
          label="Debit Chargs on Total Amount"
          placeholder="Select One"
          onChange={() => {}}
          value=""
        />
      </div>
    </>
  );
};

export default SchemeConfigurationForm;

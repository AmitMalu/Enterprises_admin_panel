import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TextComponent from "../../Components/Atoms/TextComponent";
import BreadCrumb from "../../Components/Molecules/BreadCrumb";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { Grid } from "@mantine/core";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import FormikTextInputComponent from "../../Components/Molecules/FormikTextInputComponent";
import FormikSelectComponent from "../../Components/Molecules/FormikSelectComponent";
import {
  initialValues,
  validationSchema,
  VendorFormType,
} from "../../Config/Master/VendorConfig";
import {
  booleanSelectData,
  prioritySelectDataInNumbers,
  pubPvtSelectData,
} from "../../Utils/utils";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import {
  handleVendorFormSubmit,
  transformVendorToFormData,
} from "../../Redux/Features/Masters/VendorMaster/utils";
import { fetchVendorById } from "../../Redux/Features/Masters/VendorMaster/thunks";
import { clearSelectedVendor } from "../../Redux/Features/Masters/VendorMaster/slice";
import { useProductSubProduct } from "../../Utils/hooks/useProductSubProduct";

const VendorForm = ({ mode }: { mode: string }) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedVendor } = useAppSelector((state) => state.masters.vendor);

  const [formData, setFormData] = useState<VendorFormType>(initialValues);

  const handleSubmit = (values: VendorFormType) => {
    handleVendorFormSubmit(mode, id, values, dispatch, navigate, setFormData);
  };

  // Fetch Data by Id when Edit
  useEffect(() => {
    if (mode === "edit" && id) {
      dispatch(fetchVendorById(id));
    }

    return () => {
      // Only clear form and selected Operator on unmount in "edit" mode
      if (mode === "edit") {
        setFormData(initialValues); // Reset form data on unmount
        dispatch(clearSelectedVendor()); // Reset selected Operator in the store
      }
    };
  }, [id, dispatch, mode]);

  // Set data to the form when Edit Mode
  useEffect(() => {
    if (selectedVendor && mode === "edit") {
      setFormData(transformVendorToFormData(selectedVendor));
    }
  }, [selectedVendor, mode]);

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col bg-[#F8F8F8]">
      <TextComponent fontSize={24} fontFamily="Inter" fontWeight={600}>
        {mode === "edit" ? "Edit Vendor Master Form" : "Vendor Master Form"}
      </TextComponent>

      {/* Sub Heading */}
      <BreadCrumb type={"Vendor"} text="Master" />

      <Formik
        enableReinitialize
        initialValues={formData}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleSubmit}
      >
        {(formik: FormikProps<any>) => {
          const {
            productDropdownData,
            loadingProductList,
            subProductDropdownData,
            loadingSubProductList,
            subProductKey,
          } = useProductSubProduct({
            selectedProductId: formik.values.productId,
            selectedSubProductId: formik.values.subProductId,
            onSubProductReset: () => formik.setFieldValue("subProductId", ""),
          });

          return (
            <Form className="flex-1 overflow-auto scrollbar-hide mt-4 py-2 xl:py-4 px-4 bg-white rounded-2xl">
              <Grid gutter="lg">
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="vendorName"
                    label="Vendor Name"
                    placeholder="Enter Vendor Name"
                    withAsterisk
                    required
                    maxLength={50}
                    allowSpecialChar={false}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="vendorCode"
                    label="Vendor Code"
                    placeholder="Enter Vendor Code"
                    withAsterisk
                    required
                    maxLength={50}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikSelectComponent
                    name="productId"
                    label="Product"
                    value={formik.values.productId}
                    placeholder="Select Product"
                    withAsterisk
                    required
                    data={productDropdownData}
                    disabled={loadingProductList}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikSelectComponent
                    name="subProductId"
                    key={subProductKey}
                    value={formik.values.subProductId}
                    data={subProductDropdownData}
                    label="Sub Product"
                    placeholder="Select Sub Product"
                    withAsterisk
                    required
                    disabled={loadingSubProductList}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="modesSupported"
                    label="Modes Supported"
                    placeholder="Enter Mode Supported"
                    withAsterisk
                    maxLength={50}
                    allowSpecialChar={false}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikSelectComponent
                    name="priority"
                    label="Priority"
                    placeholder="Select Priority"
                    withAsterisk
                    allowDeselect={false}
                    data={prioritySelectDataInNumbers}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikSelectComponent
                    name="isActive"
                    label="Is Active"
                    placeholder="Select Active Status"
                    allowDeselect={false}
                    withAsterisk
                    data={booleanSelectData}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikSelectComponent
                    name="bankType"
                    label="Bank Type"
                    placeholder="Select Bank Type"
                    withAsterisk
                    allowDeselect={false}
                    data={pubPvtSelectData}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="website"
                    label="Website Url"
                    placeholder="Enter Website URL"
                    withAsterisk
                    maxLength={100}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="logo"
                    label="logo Url"
                    placeholder="Enter logo URL"
                    withAsterisk
                    maxLength={100}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="parameter"
                    label="Parameter"
                    placeholder="Enter Parameter"
                    withAsterisk
                    maxLength={100}
                  />
                </Grid.Col>
              </Grid>

              <div className="flex justify-end mt-4">
                <ButtonComponent
                  fullWidth={false}
                  radius={6}
                  borderColor="#fff"
                  variant="filled"
                  type="submit"
                  bgColor="#C30305"
                  textColor="#FFFFFF"
                  style={{ padding: "10px 30px" }}
                >
                  SUBMIT
                </ButtonComponent>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default VendorForm;

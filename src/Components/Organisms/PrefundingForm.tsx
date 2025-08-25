import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FUNDING_KEY,
  FUNDING_URL,
  initialValues,
  PrefundingFormType,
  validationSchema,
} from "../../Config/Funding/preFundingConfig";
import BreadCrumb from "../Molecules/BreadCrumb";
import { Form, Formik } from "formik";
import ButtonComponent from "../Atoms/ButtonComponent";
import FormikTextInputComponent from "../Molecules/FormikTextInputComponent";
import { Grid } from "@mantine/core";
import * as Yup from "yup";
import { useThrottledFormSubmit } from "../../Utils/hooks/useThrottleFormSubmit";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../Redux/hooks";
import FormikSelectComponent from "../Molecules/FormikSelectComponent";
import {
  fetchFundingById,
  submitFundRequest,
} from "../../Redux/Features/Fundings/thunks";
import BackHeader from "../Molecules/BackHeader";

const PrefundingForm = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<PrefundingFormType>(initialValues);
  const [selectedAction, setSelectedAction] = useState<
    "APPROVED" | "REJECTED" | null
  >(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isActionDisabled, setIsActionDisabled] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const handleSubmit = useThrottledFormSubmit<any>(() => {
    if (isSubmitting) return;

    if (!selectedAction) {
      toast.error("Please select APPROVE or REJECT.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      approveOrRejectHierarchyId: "IM-AD-024",
      fundRequestId: id,
      status: selectedAction,
    };

    dispatch(submitFundRequest(payload))
      .unwrap()
      .then(() => {
        toast.success(`Fund request ${selectedAction} successfully`);
        navigate("/funding/authorization");
      })
      .catch((err: any) => {
        toast.error(err || "Action failed");
        setTimeout(() => {
          navigate("/funding/authorization");
        }, 2000);
      });
  }, 3000);

  useEffect(() => {
    const fetchAndSet = async () => {
      if (id) {
        setLoading(true);
        setFetchError(null);
        try {
          const data = await dispatch(
            fetchFundingById({ key: FUNDING_KEY, endpoint: FUNDING_URL, id })
          ).unwrap();

          if (data.status !== "PENDING") {
            setIsActionDisabled(true);
          }
          setFormData(data);
        } catch (err: any) {
          const errorMessage = err || "Something went wrong";
          toast.error(errorMessage);
          setFetchError(errorMessage);
          setTimeout(() => {
            navigate("/funding/authorization");
          }, 2000);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAndSet();

    return () => {
      // Only clear form and selected product on unmount in "edit" mode
      setFormData(initialValues); // Reset form data on unmount
    };
  }, [dispatch, id]);

  const readOnly = true;

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col bg-[#F8F8F8]">

      <BackHeader
        title={"Prefunding Form"}
        backPath="/funding/authorization"
      />

      {/* Sub Heading */}
      <BreadCrumb type={"Prefunding"} text="Funding" />

      <Formik
        enableReinitialize
        initialValues={formData}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleSubmit}
      >
        <Form className="flex-1 overflow-auto scrollbar-hide mt-4 py-2 xl:py-4 px-4 bg-white rounded-2xl">
          <Grid gutter="lg">
            <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="paymentMode"
                label="Deposit Type"
                placeholder="Enter Deposit Type"
                required
                disabled={readOnly}
                allowSpecialChar={false}
              />
            </Grid.Col>
            <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="bankTranId"
                label="Transaction Id"
                placeholder="Enter Transaction Id"
                disabled={readOnly}
                allowSpecialChar={false}
              />
            </Grid.Col>

            <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="depositAmount"
                label="Amount"
                placeholder="Enter Amount"
                capitalize
                disabled={readOnly}
                allowNumber={false}
                allowSpecialChar={false}
              />
            </Grid.Col>

            <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="bankAccountNumber"
                label="Bank Account"
                placeholder="Type BankAccount"
                disabled={readOnly}
                allowSpecialChar={false}
              />
            </Grid.Col>

            <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="depositDate"
                type="date"
                label="Date of Deposit"
                disabled={readOnly}
                placeholder="Select Deposit Date"
              />
            </Grid.Col>

            <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="depositImage"
                label="Deposit Slip"
                disabled={readOnly}
                placeholder="Add Deposit Slip"
                accept="image/png, image/jpeg, application/pdf"
                size="sm"
              />
            </Grid.Col>

            <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="requestedBy"
                type="text"
                label="Requested By"
                placeholder="Requested By"
                disabled={readOnly}
              />
            </Grid.Col>

            <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="ipAddress"
                type="text"
                label="Client IP"
                placeholder="Enter Client IP"
                disabled={readOnly}
              />
            </Grid.Col>

            <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="mobileNumber"
                type="text"
                label="Partner MobileNumber"
                placeholder="Enter Partner Number"
                allowSpecialChar={false}
                allowCharacter={false}
                disabled={readOnly}
              />
            </Grid.Col>

            <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
              <FormikSelectComponent
                name="status"
                label="Request Status"
                allowDeselect={true}
                placeholder="Enter Request Status"
                disabled={readOnly}
                data={[
                  { label: "PENDING", value: "PENDING" },
                  { label: "APPROVED", value: "APPROVED" },
                  { label: "REJECTED", value: "REJECTED" },
                ]}
              />
            </Grid.Col>
          </Grid>

          {!loading && !fetchError && (
            <div className="flex justify-center mt-8 gap-4">
              <ButtonComponent
                fullWidth={false}
                radius={6}
                borderColor="#fff"
                variant="filled"
                type="submit"
                disabled={isSubmitting || isActionDisabled}
                bgColor="#BF0204"
                textColor="#FFFFFF"
                style={{ padding: "0px 30px" }}
                onClick={() => setSelectedAction("REJECTED")}
              >
                REJECT
              </ButtonComponent>

              <ButtonComponent
                fullWidth={false}
                radius={6}
                borderColor="#fff"
                variant="filled"
                type="submit"
                bgColor="#28a745"
                disabled={isSubmitting || isActionDisabled}
                textColor="#FFFFFF"
                style={{ padding: "0px 30px" }}
                onClick={() => setSelectedAction("APPROVED")}
              >
                APPROVED
              </ButtonComponent>
            </div>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default PrefundingForm;

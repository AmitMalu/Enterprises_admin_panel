import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../Redux/hooks";
import { useEffect, useState } from "react";
import { initialValues, KEY, URL, UserAuthFormType } from "../../Config/Management/UserAuthConfig";
import { useThrottledFormSubmit } from "../../Utils/hooks/useThrottleFormSubmit";
import { toast } from "react-toastify";
import { fetchMasterById, updateMasterItem } from "../../Redux/Features/Masters/MastersThunk";
import BreadCrumb from "../Molecules/BreadCrumb";
import { Form, Formik } from "formik";
import { Grid } from "@mantine/core";
import FormikTextInputComponent from "../Molecules/FormikTextInputComponent";
import ButtonComponent from "../Atoms/ButtonComponent";
import BackHeader from "../Molecules/BackHeader";
import PopupModal from "../Atoms/PopupModal";

const PendingUserForm = () => {

  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UserAuthFormType>(initialValues);
  const [selectedAction, setSelectedAction] = useState<
    "APPROVED" | "REJECTED" | null
  >(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [isActionDisabled, setIsActionDisabled] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [remark, setRemark] = useState("");
  const [isRemarkModalOpen, setIsRemarkModalOpen] = useState(false);

  const handleSubmit = useThrottledFormSubmit<any>(() => {
    if (isSubmitting) return;

    if (!selectedAction) {
      toast.error("Please select APPROVE or REJECT.");
      return;
    }

    setIsSubmitting(true);

    const payload: { hierarchyId: string | undefined; isApproved: boolean; remarks?: string } = {
      hierarchyId: id,
      isApproved: selectedAction === "APPROVED" ? true : false
    };
    if (selectedAction === "REJECTED") {
      payload.remarks = remark;
    }

    dispatch(updateMasterItem({ key: KEY, url: `${URL}/approve-or-reject`, data: payload, mode: "POST" }))
      .unwrap()
      .then(() => {
        toast.success(`User ${selectedAction} Successfully`);
        navigate(`/management/user/pending`);
      })
      .catch((err: any) => {
        toast.error(err || "Action failed");
        setTimeout(() => {
          navigate("/management/user/pending");
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
            fetchMasterById({ key: KEY, endpoint: `${URL}`, id })
          ).unwrap();
          setFormData(data);
        } catch (err: any) {
          const errorMessage = err || "Something went wrong";
          toast.error(errorMessage);
          setFetchError(errorMessage);
          setTimeout(() => {
            navigate("/management/user/pending");
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
        title={"Pending User Form"}
        backPath="/management/user/pending"
      />

      {/* Sub Heading */}
      <BreadCrumb type={"Pending User"} text="Management" />

      <Formik
        enableReinitialize
        initialValues={formData}
        validationSchema={null}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => {

          return (
            <Form className="flex-1 overflow-auto scrollbar-hide mt-4 py-2 xl:py-4 px-4 bg-white rounded-2xl">
              <Grid gutter="lg">
                <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="id"
                    label="ID"
                    placeholder=""
                    required
                    disabled={readOnly}
                  />
                </Grid.Col>
                <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="parentAccount"
                    label="Parent Account"
                    placeholder="Enter Parent ID"
                    disabled={readOnly}
                    allowSpecialChar={true}
                  />
                </Grid.Col>

                <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="type"
                    label="User Type"
                    placeholder="Select User Type"
                    disabled={readOnly}
                  />
                </Grid.Col>

                <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="emailId"
                    label="Email ID"
                    placeholder="Enter Email"
                    disabled={readOnly}
                    allowSpecialChar={true}
                  />
                </Grid.Col>

                <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="name"
                    label="Name"
                    disabled={readOnly}
                    placeholder="Enter Name"
                  />
                </Grid.Col>

                <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="mobileNumber"
                    label="Moble Number"
                    disabled={readOnly}
                    placeholder="Enter Mobile Number"
                  />
                </Grid.Col>

                <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="status"
                    label="Status"
                    placeholder="Select Status"
                    disabled={readOnly}
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
                    // type="submit"
                    disabled={isSubmitting}
                    bgColor="#C30305"
                    textColor="#FFFFFF"
                    style={{ padding: "0px 30px", letterSpacing: 2 }}
                    onClick={() => {
                      setSelectedAction("REJECTED");
                      setIsRemarkModalOpen(true);
                    }}
                  >
                    REJECT
                  </ButtonComponent>

                  <ButtonComponent
                    fullWidth={false}
                    radius={6}
                    borderColor="#fff"
                    variant="filled"
                    type="submit"
                    disabled={isSubmitting}
                    bgColor="#24d12c"
                    textColor="#FFFFFF"
                    style={{ padding: "0px 30px", letterSpacing: 2 }}
                    onClick={() => setSelectedAction("APPROVED")}
                  >
                    APPROVED
                  </ButtonComponent>
                </div>
              )}

              <PopupModal
                opened={isRemarkModalOpen}
                onClose={() => {
                  setIsRemarkModalOpen(false);
                  setRemark(""); // optional: clear remark on close
                }}
                size="md"
                padding="md"
                title="Enter Rejection Remark "
                titleSize="16px"
                titleWeight={600}
              >
                <textarea
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  placeholder="Enter rejection reason"
                  className="w-full border rounded p-2 text-sm max-h-20 min-h-12" // adds height of 6rem
                  minLength={5}
                  maxLength={100}
                />

                <div className="flex justify-end gap-4 mt-4">
                  <ButtonComponent
                    onClick={() => {
                      setIsRemarkModalOpen(false);
                      setRemark(""); // clear remark if you want to reset after cancel
                    }}
                    bgColor="#ccc"
                    textColor="#000"
                  >
                    Cancel
                  </ButtonComponent>

                  <ButtonComponent
                    onClick={() => {
                      if (!remark.trim()) {
                        toast.error("Remark is mandatory for rejection.");
                      } else {
                        setIsRemarkModalOpen(false);
                        handleSubmit(); // calls your submit logic
                      }
                    }}
                    type="submit"
                    bgColor="#BF0204"
                    textColor="#fff"
                  >
                    Submit
                  </ButtonComponent>
                </div>
              </PopupModal>

            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default PendingUserForm

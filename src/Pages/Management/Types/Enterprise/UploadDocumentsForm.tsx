import { Grid, Loader } from "@mantine/core";
import FormikFileInput from "../../../../Components/Molecules/FormikFileInput";
import FormikTextInputComponent from "../../../../Components/Molecules/FormikTextInputComponent";
import { useEffect, useState } from "react";
import { UploadDocumentsFormProps } from "../../../../Config/UserCreationConfig/UserConfig";
import ButtonComponent from "../../../../Components/Atoms/ButtonComponent";
import { colors } from "../../../../theme/colors";

const UploadDocumentsForm = ({ formik, onAadhaarVerify, onPanVerify }: UploadDocumentsFormProps) => {

  const [aadhaarVerifying, setAadhaarVerifying] = useState(false);
  const [panVerifying, setPanVerifying] = useState(false);

  const showVerifyButton =
    formik.values.aadhaarNumber?.length === 12 &&
    formik.values.isAadhaarVerified !== true;

  const showVerifiedMess = formik.values.aadhaarNumber?.length === 12 && formik.values.isAadhaarVerified;

  const showPanVerifyButton =
    formik.values.panNumber?.length === 10 &&
    formik.values.panVerified !== true;

  const showPanVerifiedMess = formik.values.panNumber?.length === 10 && formik.values.panVerified;

  useEffect(() => {
    if (
      formik.values.isAadhaarVerified &&
      formik.values.lastVerifiedAadhaar &&
      formik.values.aadhaarNumber !== formik.values.lastVerifiedAadhaar
    ) {
      formik.setFieldValue("isAadhaarVerified", false);
      formik.setFieldValue("aadhaarPanVerified", false);
      formik.setFieldValue("lastVerifiedAadhaar", null);
    }
  }, [formik.values.aadhaarNumber]);

  useEffect(() => {
    if (
      formik.values.panVerified &&
      formik.values.lastVerifiedPan &&
      formik.values.panNumber !== formik.values.lastVerifiedPan
    ) {
      formik.setFieldValue("panVerified", false);
      formik.setFieldValue("lastVerifiedPan", null);
    }
  }, [formik.values.panNumber]);

  return (
    <>
      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, md: 4, lg: 2 }}>
          <FormikFileInput
            name="adhaarFront"
            label="Adhaar Front Photo"
            withAsterisk
            placeholder="Select File"
            accept="image/png, image/jpeg"
            size="sm"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4, lg: 2 }}>
          <FormikFileInput
            name="adhaarBack"
            label="Adhaar Back Photo"
            withAsterisk
            placeholder="Select File"
            accept="image/png, image/jpeg"
            size="sm"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
          <FormikFileInput
            name="pancardPhoto"
            label="Add Pancard"
            withAsterisk
            placeholder="Select File"
            accept="image/png, image/jpeg"
            size="sm"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
          <FormikFileInput
            name="shopPhoto"
            label="Shop Photo"
            withAsterisk
            placeholder="Upload File"
            accept="image/png, image/jpeg"
            size="sm"
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 4, lg: 4 }}>
          <FormikTextInputComponent
            name="aadhaarNumber"
            label="Aadhaar Number"
            placeholder="Enter Your Aadhaar Number"
            withAsterisk
            required
            maxLength={15}
            allowSpace={false}
            allowSpecialChar={false}
            size="sm"
            rightSectionWidth={aadhaarVerifying ? 40 : 70}
            rightSection={
              showVerifiedMess ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: colors.status.successAlt,
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  {formik.values.aadhaarPanVerified
                    ? "🔗 Linked"
                    : "✓ Verified"}
                </div>
              ) : showVerifyButton ? (
                aadhaarVerifying ? (
                  <div style={{ display: "flex", alignItems: "center", height: "24px" }}>
                    <Loader size="xs" color={colors.status.successStrong} />
                  </div>
                ) : (
                  <ButtonComponent
                    fw="500"
                    style={{
                      marginRight: "0px",
                      padding: "0px 8px",
                      height: "24px",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                    bgColor={colors.status.successStrong}
                    textColor="white"
                    fontSize="12"
                    size="xs"
                    onClick={async () => {
                      formik.setFieldValue("lastVerifiedAadhaar", formik.values.aadhaarNumber);
                      // setAadhaarVerifying(true); // Start spinner
                      await onAadhaarVerify?.(formik);
                      setAadhaarVerifying(false); // Stop spinner
                    }}
                  >
                    {aadhaarVerifying ? (
                      <>
                        <span>Verifying</span>
                        <span className="spinner" />
                      </>
                    ) : (
                      "Verify"
                    )}
                  </ButtonComponent>
                )
              ) : null}
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 4, lg: 4 }}>
          <FormikTextInputComponent
            name="panNumber"
            label="Pan Number"
            placeholder="Enter Your Pan Number"
            withAsterisk
            capitalize
            required
            maxLength={15}
            allowSpace={false}
            allowSpecialChar={false}
            size="sm"
            rightSectionWidth={panVerifying ? 40 : 70}
            rightSection={
              showPanVerifiedMess ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: colors.status.successAlt,
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  ✓ Verified
                </div>
              ) : showPanVerifyButton ? (
                panVerifying ? (
                  <div style={{ display: "flex", alignItems: "center", height: "24px" }}>
                    <Loader size="xs" color={colors.status.successStrong} />
                  </div>
                ) : (
                  <ButtonComponent
                    fw="500"
                    style={{
                      marginRight: "0px",
                      padding: "0px 8px",
                      height: "24px",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                    bgColor={colors.status.successStrong}
                    textColor="white"
                    fontSize="12"
                    size="xs"
                    onClick={async () => {
                      formik.setFieldValue("lastVerifiedPan", formik.values.panNumber);
                      setPanVerifying(true);
                      await onPanVerify?.(formik);
                      setPanVerifying(false);
                    }}
                  >
                    {panVerifying ? "Verifying..." : "Verify"}
                  </ButtonComponent>
                )
              ) : null}
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 4, lg: 4 }}>
          <FormikTextInputComponent
            name="shopNumber"
            label="Shop Number"
            placeholder="Enter Your Shop Number"
            withAsterisk
            required
            maxLength={20}
            allowSpecialChar={false}
            size="sm"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4, lg: 6 }}>
          <FormikFileInput
            name="businessProof"
            label="Add Business Proof"
            withAsterisk
            placeholder="Select File"
            accept="image/png, image/jpeg , application/pdf"
            size="sm"
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 4, lg: 6 }}>
          <FormikTextInputComponent
            name="businessNumber"
            label="Business Number"
            placeholder="Enter Your Business Number"
            withAsterisk
            required
            maxLength={20}
            allowSpecialChar={false}
            size="sm"
          />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default UploadDocumentsForm;

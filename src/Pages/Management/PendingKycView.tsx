import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../Redux/hooks';
import { toast } from 'react-toastify';
import { KYC_VIEW_KEY, KycDetailsFormType, kycDetailsHeaders, kycDetailsInitialValues, kycDetailsSchema, KycDetailsTableType, PENDING_KYC_URL } from '../../Config/Management/PendingKycConfig';
import { deleteMasterItem, DocumentValidationApi, DownloadAadhaarApi, fetchMasterById, handleKycDocumentUpdate, InitializeDigilockerApi } from '../../Redux/Features/Masters/MastersThunk';
import BackHeader from '../../Components/Molecules/BackHeader';
import BreadCrumb from '../../Components/Molecules/BreadCrumb';
import ShimmerTableRows from '../../Components/Atoms/ShimmerTableRows';
import GenericMasterTable from '../../Components/Organisms/GenericMasterTable';
import { Grid, Tooltip } from '@mantine/core';
import { DeleteIcon, EditIcon2, EyeIcon2 } from '../../assets/Icons';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormikSelectComponent from '../../Components/Molecules/FormikSelectComponent';
import FormikTextInputComponent from '../../Components/Molecules/FormikTextInputComponent';
import FormikFileInput from '../../Components/Molecules/FormikFileInput';
import ButtonComponent from '../../Components/Atoms/ButtonComponent';
import FilePreviewModal from '../../Components/Atoms/FilePreviewModal';
import { extractVerificationApiMessage } from '../../Utils/utils';
import { API_ENDPOINTS } from '../../Config/Api/EndPoints';
import { colors } from "../../theme/colors";

const documents = [
    { label: "AADHAAR FRONT", value: "AADHAAR_FRONT" },
    { label: "AADHAAR BACK", value: "AADHAAR_BACK" },
    { label: "AADHAAR_PAN_VERIFIED", value: "AADHAAR_PAN_VERIFIED" },
    { label: "PAN", value: "PAN" },
    { label: "SHOP", value: "SHOP" },
    { label: "BUSINESS", value: "BUSINESS" },
    { label: "EMAIL", value: "EMAIL" },
];

const PendingKycView = () => {

    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState<KycDetailsTableType[]>([]);
    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | string | null>(null);
    const [selectedFileName, setSelectedFileName] = useState<string>("");
    const [previewOpen, setPreviewOpen] = useState(false);
    const [formKey, setFormKey] = useState(0);

    const handleDigilockerAadhaarVerify = async (
        values: KycDetailsFormType,
        formik: any
    ) => {
        try {
            const response = await dispatch(
                InitializeDigilockerApi()
            ).unwrap();

            const { token } = response.data;

            document.getElementById("digilocker-button")!.innerHTML = "";

            window.DigiboostSdk({
                gateway: "production",
                token,
                selector: "#digilocker-button",

                onSuccess: async (data: any) => {
                    try {
                        const clientId = data?.client_id;

                        const aadhaarResponse = await dispatch(
                            DownloadAadhaarApi({ clientId })
                        ).unwrap();

                        if (!aadhaarResponse) {
                            throw new Error("Aadhaar download failed");
                        }

                        const imageFile =
                            values.doc_image &&
                                typeof values.doc_image !== "string"
                                ? values.doc_image
                                : undefined;

                        await dispatch(
                            handleKycDocumentUpdate({
                                hierarchyId: id || "",
                                category: values.doc_name,
                                verified: true,
                                docNumber: values.doc_number,
                                imageFile,
                            })
                        ).unwrap();

                        toast.success("Aadhaar verified successfully");

                        await fetchAndSet();

                        formik.resetForm();
                        setFormKey((prev) => prev + 1);
                    } catch (error) {
                        toast.error("Aadhaar verification failed");
                    }
                },

                onFailure: (error: any) => {
                    console.error(error);
                    toast.error("Aadhaar verification failed");
                },
            });

            setTimeout(() => {
                const sdkButton = document.querySelector(
                    "#digilocker-button button"
                ) as HTMLButtonElement | null;

                sdkButton?.click();
            }, 100);
        } catch (error) {
            toast.error("Failed to initialize Digilocker");
        }
    };

    const handleVerify = async (values: KycDetailsFormType, formik: any) => {
        setVerifying(true);

        try {
            if (
                values.doc_name === "AADHAAR_FRONT" ||
                values.doc_name === "AADHAAR_BACK"
            ) {
                await handleDigilockerAadhaarVerify(values, formik);
                return;
            }

            const verificationResult = await dispatch(
                DocumentValidationApi({ documentType: values.doc_name, value: values.doc_number })
            ).unwrap();

            const verificationMessage = extractVerificationApiMessage(verificationResult, "Verification failed");

            if (verificationResult.success) {
                toast.success(verificationMessage);
            } else {
                toast.error(verificationMessage); // Or toast.warning if you prefer
            }

            // Determine if image needs to be sent
            const imageFile: File | undefined =
                values.doc_image && typeof values.doc_image !== "string"
                    ? (values.doc_image as File)
                    : undefined;

            // Call update API
            await dispatch(handleKycDocumentUpdate({
                hierarchyId: id || "",
                category: values.doc_name,
                verified: verificationResult.success,
                docNumber: values.doc_number,
                imageFile,
            })).unwrap();

            // // Update local data
            // setData(prevData =>
            //     prevData.map(item =>
            //         item.docName?.toLowerCase() === values.doc_name?.toLowerCase()
            //             ? {
            //                 ...item,
            //                 docNumber: values.doc_number,
            //                 docImage: values.doc_image && typeof values.doc_image === "string"
            //                     ? values.doc_image
            //                     : item.docImage,
            //                 // Keep as boolean
            //                 docStatus: !!verificationResult.success,
            //             }
            //             : item
            //     )
            // );
            await fetchAndSet();

            // Reset form
            formik.resetForm();
            setFormKey(prev => prev + 1);
        } catch (err: any) {
            toast.error(err);
        } finally {
            setVerifying(false);
        }
    };

    const handleDelete = async (item: KycDetailsTableType) => {
        try {
            // Call delete API
            await dispatch(
                deleteMasterItem({
                    url: `${API_ENDPOINTS.MANAGEMENT.KYC}/delete-document`,
                    params: { hierarchyId: id, category: item.docName },
                    successMessage: "Document deleted successfully",
                    failureMessage: "Failed to delete document",
                })
            ).unwrap();

            // Update the docImage field to ""
            // setData(prevData =>
            //     prevData.map(d =>
            //         d.docName?.toLowerCase() === item.docName?.toLowerCase()
            //             ? { ...d, docImage: "" }
            //             : d
            //     )
            // );

            fetchAndSet();
        } catch (err: any) {
            console.error("Delete failed", err);
        }
    };

    const fetchAndSet = async () => {
        if (id) {
            setLoading(true);
            setFetchError(null);
            try {
                const data = await dispatch(
                    fetchMasterById({ key: KYC_VIEW_KEY, endpoint: `${PENDING_KYC_URL}/details`, id, method: "POST" })
                ).unwrap();

                setData(data);

            } catch (err: any) {
                toast.error(err);
                setFetchError(err);
                setTimeout(() => {
                    navigate("/management/kyc-pending/");
                }, 2000);
            }
            finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchAndSet();
    }, [dispatch, id]);

    return (
        <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col bg-surface-app">
            <div
                id="digilocker-button"
                style={{ display: "none" }}
            />
            <BackHeader
                title="PENDING KYC DETAILS"
                backPath="/management/kyc-pending"
            />

            {/* Sub Heading */}
            <BreadCrumb type={"Pending KYC"} text="Management" />

            <Formik
                key={formKey}
                initialValues={kycDetailsInitialValues}
                validationSchema={Yup.object(kycDetailsSchema)}
                onSubmit={(values, formikHelpers) => {
                    handleVerify(values, formikHelpers);
                }}
            >
                {({ values, setValues }) => {

                    return (
                        <Form className="flex flex-col gap-2 mt-4">
                            <Grid gutter="sm">
                                <Grid.Col span={{ base: 6, sm: 6, md: 3, lg: 3 }} >
                                    <FormikSelectComponent
                                        name="doc_name"
                                        label="Document"
                                        placeholder="Select Document"
                                        size="sm"
                                        searchable={true}
                                        allowDeselect={true}
                                        data={documents.map((item) => item)}
                                        required
                                        withAsterisk
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 6, sm: 6, md: 3, lg: 3 }} >
                                    <FormikTextInputComponent
                                        name="doc_number"
                                        label="Document Number"
                                        placeholder="Enter Document Number"
                                        size="sm"
                                        required
                                        withAsterisk
                                        maxLength={51}
                                        toLowerCase={values.doc_name === "EMAIL"}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 6, sm: 4, md: 3, lg: 3 }} >
                                    <FormikFileInput
                                        name="doc_image"
                                        label="Document Image"
                                        placeholder="Select File"
                                        size="sm"
                                        accept="image/png, image/jpeg"
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 6, sm: 4, md: 3, lg: 3 }} >
                                    <div className="flex justify-end items-end h-full gap-2">
                                        <ButtonComponent
                                            type="submit"
                                            size="sm"
                                            fontSize="14"
                                            radius={6}
                                            bgColor={colors.brand.primary}
                                            textColor={colors.text.inverse}
                                            disabled={!!fetchError || !!loading || verifying}
                                        >
                                            {verifying ? "Verifying..." : "Verify"}
                                        </ButtonComponent>
                                    </div>
                                </Grid.Col>
                            </Grid>

                            {
                                loading ? (
                                    // Render shimmer
                                    <ShimmerTableRows rowCount={6} columnCount={kycDetailsHeaders.length} />
                                ) : (
                                    <GenericMasterTable<KycDetailsTableType>
                                        data={data}
                                        headers={kycDetailsHeaders}
                                        renderExtraHeader={() => <></>} // empty header for action column/>
                                        renderExtraRowCell={(item) => (
                                            <div className="flex justify-center gap-3 min-w-10">
                                                <Tooltip
                                                    label="Edit Details" withArrow={false}
                                                    styles={{
                                                        tooltip: {
                                                            backgroundColor: 'grey',
                                                            color: 'white',
                                                            fontSize: '12px',
                                                        }
                                                    }}
                                                >
                                                    <span
                                                        onClick={() => {
                                                            setValues({
                                                                doc_name: item.docName || "",
                                                                doc_number: item.docNumber || "",
                                                                doc_image: item.docImage || null // or appropriate initial state
                                                            });
                                                        }}
                                                        className="cursor-pointer"
                                                    >
                                                        <EditIcon2 width={14} height={14} color='black' />
                                                    </span>
                                                </Tooltip>
                                                <Tooltip
                                                    label="View Document" withArrow={false}
                                                    styles={{
                                                        tooltip: {
                                                            backgroundColor: 'grey',
                                                            color: 'white',
                                                            fontSize: '12px',
                                                        }
                                                    }}
                                                >
                                                    <span
                                                        onClick={() => {
                                                            setSelectedFile(item.docImage)
                                                            setSelectedFileName(item.docName || "Document");
                                                            setPreviewOpen(true);
                                                        }}
                                                        className="cursor-pointer"
                                                    >
                                                        <EyeIcon2 color='black' width={14} height={14} />
                                                    </span>
                                                </Tooltip>
                                                <Tooltip
                                                    label="Delete Document" withArrow={false}
                                                    styles={{
                                                        tooltip: {
                                                            backgroundColor: 'grey',
                                                            color: 'white',
                                                            fontSize: '12px',
                                                        }
                                                    }}
                                                >
                                                    <span
                                                        onClick={() => handleDelete(item)}
                                                        className="cursor-pointer"
                                                    >
                                                        <DeleteIcon width={14} height={14} color='black' />
                                                    </span>
                                                </Tooltip>
                                            </div>
                                        )}
                                    />
                                )
                            }
                        </Form>
                    )
                }}
            </Formik>

            <FilePreviewModal
                file={selectedFile}
                fileName={selectedFileName}
                opened={previewOpen}
                onClose={() => setPreviewOpen(false)}
            />
        </div>
    )
}

export default PendingKycView

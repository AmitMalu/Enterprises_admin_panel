import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Grid, Loader } from "@mantine/core";
import { useAppDispatch } from "../../Redux/hooks";
import TextComponent from "../../Components/Atoms/TextComponent";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import PopupModal from "../../Components/Atoms/PopupModal";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import FormikSelectComponent from "../../Components/Molecules/FormikSelectComponent";
import FormikTextInputComponent from "../../Components/Molecules/FormikTextInputComponent";
import { EditIcon } from "../../assets/Icons";
import { exportToCsv, pageSizeSelectData } from "../../Utils/utils";
import { resetMaster, setPagination } from "../../Redux/Features/Masters/MastersSlice";
import { updateMasterItem } from "../../Redux/Features/Masters/MastersThunk";
import { useFetchMasterList } from "../../Utils/hooks/useFetchMasterList";
import { axiosInstance } from "../../Config/Api/AxiosInstance";
import { colors } from "../../theme/colors";
import {
    memberRoleOptions,
    transformWalletPreviewToEditForm,
    transformWalletPreviewToTableType,
    walletPreviewEditInitialValues,
    walletPreviewFilterInitialValues,
    walletPreviewFilterValidationSchema,
    walletPreviewHeaders,
    WALLET_PREVIEW_KEY,
    WALLET_PREVIEW_URL,
    WalletPreviewEditForm,
    WalletPreviewTableType,
    walletPreviewEditValidationSchema,
} from "../../Config/Funding/WalletPreviewConfig";

const WalletPreview = () => {
    const dispatch = useAppDispatch();

    // ── list state ────────────────────────────────────────────────────────────
    const [filterVisible, setFilterVisible] = useState(false);
    const [filterValues, setFilterValues] = useState<Record<string, any>>({});
    const [submittedFilter, setSubmittedFilter] = useState<Record<string, any> | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const [visibleColumns, setVisibleColumns] = useState<string[]>(
        walletPreviewHeaders.map((h) => h.key as string)
    );
    const [payload, setPayload] = useState<any>({ hierarchyType: "" });

    const dataRef = useRef<WalletPreviewTableType[] | null>(null);

    // ── edit modal state ──────────────────────────────────────────────────────
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [editSubmitting, setEditSubmitting] = useState(false);
    const [editInitialValues, setEditInitialValues] = useState<WalletPreviewEditForm>(
        walletPreviewEditInitialValues
    );
    const [selectedHierarchyId, setSelectedHierarchyId] = useState<string>("");

    // ── fetch list ────────────────────────────────────────────────────────────
    const { data, loading, error, pagination, setPage, setPageSize } =
        useFetchMasterList<WalletPreviewTableType>({
            key: WALLET_PREVIEW_KEY,
            url: WALLET_PREVIEW_URL,
            method: "POST",
            payload,
            transformDataFn: transformWalletPreviewToTableType,
            filter: submittedFilter,
            refreshKey,
        });

    useEffect(() => {
        dataRef.current = data;
    }, [data]);

    // ── filter handlers ───────────────────────────────────────────────────────
    const handleFilterChange = (key: string, value: any) => {
        setFilterValues((prev) => ({ ...prev, [key]: value }));
    };

    const handleFilterSubmit = (key: string, value: any) => {
        dispatch(
            setPagination({
                key: WALLET_PREVIEW_KEY,
                pagination: { ...pagination, currentPage: 1, pageSize: pagination.pageSize },
            })
        );
        setSubmittedFilter((prev) => ({ ...prev, [key]: value }));
    };

    // ── toolbar handlers ──────────────────────────────────────────────────────
    const handleToggleColumn = (key: string) => {
        setVisibleColumns((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
        );
    };

    const handleToggleAllColumns = (selectAll: boolean) => {
        if (selectAll) {
            setVisibleColumns(walletPreviewHeaders.map((h) => h.key as string));
        } else {
            setVisibleColumns([]);
        }
    };

    const handleRefresh = () => {
        dispatch(resetMaster(WALLET_PREVIEW_KEY));
        setFilterValues({});
        setSubmittedFilter(null);
        setVisibleColumns(walletPreviewHeaders.map((h) => h.key as string));
        setRefreshKey((prev) => prev + 1);
        setFilterVisible(false);
    };

    const handleExportClick = () => {
        const currentData = dataRef.current;
        if (!currentData || currentData.length === 0) {
            toast.warning("No data available to export.");
            return;
        }
        exportToCsv(currentData, "Wallet-Preview");
    };

    // ── Edit: fetch by ID then open modal ────────────────────────────────────
    const handleEdit = async (item: WalletPreviewTableType) => {
        // Resolve the hierarchyId — prefer memberNo (which holds hierarchyId from API)
        const hierarchyId = String(item.hierarchyId || "");
        if (!hierarchyId) {
            toast.error("Cannot edit: Hierarchy ID not found.");
            return;
        }
        setSelectedHierarchyId(hierarchyId);
        setEditLoading(true);
        setEditModalOpen(true);

        try {
            const response = await axiosInstance.get(
                `${WALLET_PREVIEW_URL}/${hierarchyId}`
            );
            const responseData = response?.data;
            if (responseData?.statusCode === 200 && responseData?.data) {
                setEditInitialValues(
                    transformWalletPreviewToEditForm(responseData.data)
                );
            } else {
                toast.error(responseData?.message || "Failed to fetch wallet details.");
                setEditModalOpen(false);
            }
        } catch (err: any) {
            toast.error(
                err?.response?.data?.message || err?.message || "Failed to fetch wallet details."
            );
            setEditModalOpen(false);
        } finally {
            setEditLoading(false);
        }
    };

    const handleCloseModal = () => {
        setEditModalOpen(false);
        setSelectedHierarchyId("");
        setEditInitialValues(walletPreviewEditInitialValues);
    };

    // ── Edit: submit PUT ──────────────────────────────────────────────────────
    const handleEditSubmit = async (values: WalletPreviewEditForm) => {
        setEditSubmitting(true);
        try {
            await dispatch(
                updateMasterItem({
                    key: WALLET_PREVIEW_KEY,
                    url: WALLET_PREVIEW_URL,
                    data: {
                        hierarchyId: selectedHierarchyId,
                        prepaidCutoffAmount: Number(values.prepaidCutoffAmount),
                        postpaidCutoffAmount: Number(values.postpaidCutoffAmount),
                        remark: values.remark
                    },
                    mode: "PUT",
                })
            ).unwrap();

            toast.success("Wallet Preview updated successfully!");
            handleCloseModal();
            setRefreshKey((prev) => prev + 1);
        } catch (err: any) {
            toast.error(err || "Failed to update Wallet Preview.");
        } finally {
            setEditSubmitting(false);
        }
    };

    // ── filter form (hierarchyType) submit ────────────────────────────────────
    const handleTopFilterSubmit = (values: { hierarchyType: string }) => {
        setPayload({ hierarchyType: values.hierarchyType ?? "" });
        dispatch(resetMaster(WALLET_PREVIEW_KEY));
        setRefreshKey((prev) => prev + 1);
    };

    // ─────────────────────────────────────────────────────────────────────────
    return (
        <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
            {/* Heading */}
            <TextComponent fontSize={22} fontFamily="Inter" fontWeight={600}>
                Wallet Preview
            </TextComponent>

            {/* Member Role Filter */}
            <Formik
                initialValues={walletPreviewFilterInitialValues}
                validationSchema={Yup.object(walletPreviewFilterValidationSchema)}
                onSubmit={handleTopFilterSubmit}
            >
                {({ values }) => (
                    <Form>
                        <Grid gutter="sm" className="mt-2">
                            <Grid.Col span={{ base: 6, xs: 6, md: 4, lg: 2.5 }}>
                                <FormikSelectComponent
                                    name="hierarchyType"
                                    label="Hierarchy Type"
                                    placeholder="All Roles"
                                    size="xs"
                                    allowDeselect
                                    clearable
                                    data={memberRoleOptions}
                                    value={values.hierarchyType}
                                />
                            </Grid.Col>

                            <Grid.Col span="auto">
                                <div className="flex justify-end items-end h-full gap-2">
                                    <ButtonComponent
                                        fontSize="14"
                                        fullWidth={false}
                                        radius={6}
                                        size="sm"
                                        variant="filled"
                                        type="submit"
                                        bgColor={colors.brand.primary}
                                        textColor={colors.text.inverse}
                                        borderColor={colors.text.inverse}
                                    >
                                        VIEW
                                    </ButtonComponent>
                                </div>
                            </Grid.Col>
                        </Grid>
                    </Form>
                )}
            </Formik>

            {/* Toolbar */}
            <GenericMasterToolbar
                onRefresh={handleRefresh}
                onColumnChange={handleToggleColumn}
                onToggleAll={handleToggleAllColumns}
                onExport={handleExportClick}
                onFilter={() => setFilterVisible((prev) => !prev)}
                headers={walletPreviewHeaders}
                visibleColumns={visibleColumns}
                loading={loading}
                error={error ? error.toString() : null}
            />

            {/* Table */}
            {loading ? (
                <ShimmerTableRows rowCount={6} columnCount={walletPreviewHeaders.length} />
            ) : (
                <GenericMasterTable<WalletPreviewTableType>
                    data={data}
                    headers={walletPreviewHeaders.filter((h) =>
                        visibleColumns.includes(h.key as string)
                    )}
                    renderExtraHeader={() => <>Action</>}
                    renderExtraRowCell={(item) => (
                        <div className="flex justify-center gap-2 min-w-10">
                            <span
                                onClick={() => handleEdit(item)}
                                className="cursor-pointer"
                            >
                                <EditIcon />
                            </span>
                        </div>
                    )}
                    pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={setPage}
                    onPageSizeChange={setPageSize}
                    pageSize={pagination.pageSize}
                    pageSizeOptions={pageSizeSelectData}
                    message={`Showing page ${pagination.currentPage} of ${pagination.totalPages}`}
                    filterVisible={filterVisible}
                    filterValues={filterValues}
                    onFilterChange={handleFilterChange}
                    onFilterSubmit={handleFilterSubmit}
                />
            )}

            {/* Edit Modal */}
            <PopupModal
                opened={editModalOpen}
                onClose={handleCloseModal}
                title="Edit Wallet Preview"
                size="lg"
            >
                {editLoading ? (
                    <div className="flex justify-center items-center py-8">
                        <Loader size="md" color="blue" />
                    </div>
                ) : (
                    <Formik
                        initialValues={editInitialValues}
                        enableReinitialize
                        validationSchema={Yup.object(walletPreviewEditValidationSchema)}
                        onSubmit={handleEditSubmit}
                    >
                        {() => (
                            <Form className="flex flex-col gap-2">
                                <Grid gutter="lg">
                                    <Grid.Col span={{ base: 12, md: 6 }}>
                                        <FormikTextInputComponent
                                            name="hierarchyId"
                                            label="Hierarchy Id"
                                            size="sm"
                                            withAsterisk
                                            required
                                            disabled
                                        />
                                    </Grid.Col>

                                    <Grid.Col span={{ base: 12, md: 6 }}>

                                        <FormikTextInputComponent
                                            name="remark"
                                            label="Remark"
                                            placeholder="Enter Remark"
                                            size="sm"
                                        />
                                    </Grid.Col>

                                    <Grid.Col span={{ base: 12, md: 6 }}>

                                        <FormikTextInputComponent
                                            name="prepaidCutoffAmount"
                                            label="Prepaid Cutoff Amount"
                                            placeholder="Enter prepaid cutoff amount"
                                            size="sm"
                                            type="number"
                                            withAsterisk
                                            required
                                        />
                                    </Grid.Col>

                                    <Grid.Col span={{ base: 12, md: 6 }}>

                                        <FormikTextInputComponent
                                            name="postpaidCutoffAmount"
                                            label="Postpaid Cutoff Amount"
                                            placeholder="Enter postpaid cutoff amount"
                                            size="sm"
                                            type="number"
                                            withAsterisk
                                            required
                                        />
                                    </Grid.Col>
                                </Grid>

                                <div className="flex justify-end gap-3 mt-2">
                                    <ButtonComponent
                                        fontSize="14"
                                        fullWidth={false}
                                        radius={6}
                                        size="sm"
                                        variant="outline"
                                        type="button"
                                        bgColor="transparent"
                                        textColor={colors.brand.primary}
                                        borderColor={colors.brand.primary}
                                        onClick={handleCloseModal}
                                        disabled={editSubmitting}
                                    >
                                        Cancel
                                    </ButtonComponent>

                                    <ButtonComponent
                                        fontSize="14"
                                        fullWidth={false}
                                        radius={6}
                                        size="sm"
                                        variant="filled"
                                        type="submit"
                                        bgColor={colors.brand.primary}
                                        textColor={colors.text.inverse}
                                        borderColor={colors.text.inverse}
                                        disabled={editSubmitting}
                                    >
                                        {editSubmitting ? "Updating..." : "Update"}
                                    </ButtonComponent>
                                </div>
                            </Form>
                        )}
                    </Formik>
                )}
            </PopupModal>
        </div>
    );
};

export default WalletPreview;

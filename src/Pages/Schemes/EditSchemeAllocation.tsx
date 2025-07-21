import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { SchemeOption, SCHEMES_ALLOCATION_KEY, SCHEMES_ALLOCATION_URL, SubProductWithScheme, transformSchemeAllocationPayload } from "../../Config/Schemes/SchemesAllocationConfig";
import SelectComponent from "../../Components/Atoms/SelectComponent";
import { fetchMasterDropdown } from "../../Redux/Features/Masters/MastersThunk";
import { useAppDispatch } from "../../Redux/hooks";
import { toast } from "react-toastify";
import TextComponent from "../../Components/Atoms/TextComponent";
import { Grid, Loader } from "@mantine/core";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import { useThrottleMasterFormSubmit } from "../../Utils/hooks/useThrottleMasterFormSubmit";


const EditSchemeAllocation = () => {

    const { id } = useParams();
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const [subProducts, setSubProducts] = useState<SubProductWithScheme[]>([]); // initial list
    const [schemeOptions, setSchemeOptions] = useState<Record<string, SchemeOption[]>>({});
    const [modifiedSchemes, setModifiedSchemes] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<string | null>(null);
    const [loadingDropdowns, setLoadingDropdowns] = useState<Record<string, boolean>>({});

    const schemeOptionsRef = useRef(schemeOptions);
    const modifiedSchemesRef = useRef(modifiedSchemes);

    // Fetch Scheme Option list when open any dropdown
    const handleDropdownOpen = async (subProductName: string) => {
        if (!schemeOptions[subProductName]) {
            setLoadingDropdowns((prev) => ({ ...prev, [subProductName]: true }));

            try {
                const res = await dispatch(fetchMasterDropdown({
                    url: `${SCHEMES_ALLOCATION_URL}/scheme-dropdown/${subProductName}`,
                    method: "POST"
                })).unwrap();

                const updatedOptions: SchemeOption[] = [
                    { schemeId: "No scheme assigned", schemeName: "No scheme assigned", schemeCode: "No scheme assigned" },
                    ...res,
                ];

                setSchemeOptions((prev) => ({
                    ...prev,
                    [subProductName]: updatedOptions,
                }));
            } catch (err) {
                toast.error("Failed to load schemes");
            } finally {
                setLoadingDropdowns((prev) => ({ ...prev, [subProductName]: false }));
            }
        }
    };

    const handleSchemeChange = (subProductName: string, selectedSchemeName: string | null) => {
        if (!selectedSchemeName) return;

        if (selectedSchemeName === "No scheme assigned") {
            setModifiedSchemes((prev) => ({
                ...prev,
                [subProductName]: "No scheme assigned",
            }));
            return;
        }

        const selectedOption = schemeOptions[subProductName]?.find(
            (opt) => opt.schemeName === selectedSchemeName
        );

        if (selectedOption) {
            setModifiedSchemes((prev) => ({
                ...prev,
                [subProductName]: String(selectedOption.schemeId)
            }));
        }
    };

    // Submit Function
    const handleSubmit = useThrottleMasterFormSubmit<any>({
        mode: "add",
        dispatch,
        navigate,
        masterKey: SCHEMES_ALLOCATION_KEY,
        updateUrl: `${SCHEMES_ALLOCATION_URL}/assign-or-update`,
        addUrl: `${SCHEMES_ALLOCATION_URL}/assign-or-update`,
        successNavigatePath: "/schemes/allocation",
        entityName: "Scheme Allocation",
    });


    const handleUpdate = async () => {
        const payload = transformSchemeAllocationPayload({
            hierarchyId: id,
            modifiedSchemes: modifiedSchemesRef.current,
            schemeOptions: schemeOptionsRef.current,
        })

        handleSubmit(payload)
    };




    // fetch subproducts name and its scheme name
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            // setError(null);
            try {
                const response = await dispatch(
                    fetchMasterDropdown({
                        url: `${SCHEMES_ALLOCATION_URL}/retailer-scheme-allocation/${id}`,
                    })
                ).unwrap();

                setSubProducts(response);
            } catch (err: any) {
                // setError(err);
                toast.error(err || "Failed to fetch scheme allocation data.");
                setTimeout(() => {
                    navigate("/schemes/allocation");
                }, 2000);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    useEffect(() => {
        schemeOptionsRef.current = schemeOptions
    }, [schemeOptions])

    useEffect(() => {
        modifiedSchemesRef.current = modifiedSchemes
    }, [modifiedSchemes])

    return (
        <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col bg-[#F8F8F8]">
            <TextComponent fontSize={24} fontFamily="Inter" fontWeight={600}>
                Edit Scheme Allocation
            </TextComponent>

            <div className="mt-4 p-2">
                {loading ? (
                    [...Array(3)].map((_, index) => (
                        <Grid key={index} align="center" gutter="sm" className="mb-2">
                            <Grid.Col span={{ base: 2, md: 2, lg: 2 }}>
                                <div className="bg-gray-200 h-[20px] rounded animate-pulse w-[70px]" />
                            </Grid.Col>
                            <Grid.Col span={{ base: 10, md: 10, lg: 10 }}>
                                <div className="bg-gray-200 h-[36px] rounded animate-pulse w-full" />
                            </Grid.Col>
                        </Grid>
                    ))
                ) : subProducts.length === 0 ? (
                    <div className="text-center text-gray-500 text-sm p-4">
                        No sub-products available for this hierarchy.
                    </div>
                ) : (
                    subProducts?.map((item) => (
                        <Grid key={item.subProductName} align="center" gutter="sm" className="mb-2">
                            <Grid.Col span={{ base: 2, md: 2, lg: 2 }}>
                                <TextComponent fontSize={18} fontFamily="Inter" fontWeight={500} >{item.subProductName}</TextComponent>
                            </Grid.Col>

                            <Grid.Col span={{ base: 10, md: 10, lg: 10 }}>
                                <SelectComponent
                                    name={item.subProductName}
                                    size="sm"
                                    rightSection={
                                        loadingDropdowns[item.subProductName] ? <Loader size={16} /> : null
                                    }
                                    value={
                                        modifiedSchemes[item.subProductName]
                                            ? schemeOptions[item.subProductName]?.find(
                                                (opt) => String(opt.schemeId) === modifiedSchemes[item.subProductName]
                                            )?.schemeName || "No scheme assigned"
                                            : item.schemeName || "No scheme assigned"
                                    }
                                    placeholder="Select Scheme"
                                    onFocus={() => handleDropdownOpen(item.subProductName)}
                                    onChange={(value: string | null) =>
                                        handleSchemeChange(item.subProductName, value)
                                    }
                                    data={
                                        loadingDropdowns[item.subProductName]
                                            ? [{ value: "__loading__", label: "Loading schemes..." }]
                                            : [
                                                ...((schemeOptions[item.subProductName] || []).map((scheme) => ({
                                                    value: scheme.schemeName,
                                                    label: scheme.schemeName,
                                                }))),
                                                // fallback to current item.schemeName if not in fetched list
                                                ...(schemeOptions[item.subProductName]?.some(s => s.schemeName === item.schemeName)
                                                    ? []
                                                    : item.schemeName
                                                        ? [{ value: item.schemeName, label: item.schemeName }]
                                                        : [])
                                            ]}
                                />
                            </Grid.Col>
                        </Grid>
                    ))
                )}
            </div>

            <div className="flex justify-end mt-4">
                {Object.keys(modifiedSchemes).length > 0 && (
                    <ButtonComponent
                        fullWidth={false}
                        radius={6}
                        onClick={handleUpdate}
                        borderColor="#fff"
                        variant="filled"
                        bgColor="#C30305"
                        textColor="#FFFFFF"
                        style={{ padding: "10px 30px" }}
                    >
                        UPDATE
                    </ButtonComponent>
                )}
            </div>
        </div>
    )
}

export default EditSchemeAllocation

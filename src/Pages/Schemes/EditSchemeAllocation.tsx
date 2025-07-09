import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { SchemeOption, SCHEMES_ALLOCATION_URL, SubProductWithScheme } from "../../Config/Schemes/SchemesAllocationConfig";
import SelectComponent from "../../Components/Atoms/SelectComponent";
import { fetchMasterDropdown } from "../../Redux/Features/Masters/MastersThunk";
import { useAppDispatch } from "../../Redux/hooks";
import { toast } from "react-toastify";
import TextComponent from "../../Components/Atoms/TextComponent";


const EditSchemeAllocation = () => {

    const { id } = useParams();
    const dispatch = useAppDispatch()

    const [subProducts, setSubProducts] = useState<SubProductWithScheme[]>([]); // initial list
    const [schemeOptions, setSchemeOptions] = useState<Record<string, SchemeOption[]>>({});
    const [modifiedSchemes, setModifiedSchemes] = useState<Record<string, string>>({});

    const handleDropdownOpen = async (subProductName: string) => {
        if (!schemeOptions[subProductName]) {
            const res = await dispatch(fetchMasterDropdown({
                url: `${SCHEMES_ALLOCATION_URL}/scheme-dropdown/${subProductName}`
            })).unwrap()

            setSchemeOptions((prev) => ({
                ...prev,
                [subProductName]: res.data, // store options for this dropdown
            }));
        }
    };


    const handleSchemeChange = (subProductName: string, selectedSchemeName: string | null) => {
        if (!selectedSchemeName) return;

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

    const handleUpdate = async () => {
        const payload = Object.entries(modifiedSchemes).map(
            ([subProductName, schemeId]) => ({
                subProductName,
                schemeId,
            })
        );

        // await updateSchemesApi(payload); // final update API call
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await dispatch(
                    fetchMasterDropdown({
                        url: `${SCHEMES_ALLOCATION_URL}/retailer-scheme-allocation/${id}`,
                    })
                ).unwrap();

                setSubProducts(response);
            } catch (err: any) {
                toast.error(err);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);


    console.log(subProducts);

    return (
        <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col bg-[#F8F8F8]">
            <TextComponent fontSize={24} fontFamily="Inter" fontWeight={600}>
                Scheme Allocation
            </TextComponent>

            {subProducts.map((item) => (
                <div key={item.subProductName} className="flex gap-4 items-center mb-2">
                    <TextComponent fontSize={16} fontFamily="Inter" fontWeight={500} >{item.subProductName}</TextComponent>

                    <SelectComponent
                        name={item.subProductName}
                        size="sm"
                        className="w-full"
                        value={
                            // either user's selection or initial fetched scheme name
                            schemeOptions[item.subProductName]?.find(
                                (opt) => opt.schemeId === modifiedSchemes[item.subProductName]
                            )?.schemeName ||
                            (item.schemeName !== "No scheme assigned" ? item.schemeName : null)
                        }
                        placeholder="Select Scheme"
                        onFocus={() => handleDropdownOpen(item.subProductName)}

                        onChange={(value: string | null) =>
                            handleSchemeChange(item.subProductName, value)
                        }
                        data={(schemeOptions[item.subProductName] || []).map((scheme) => ({
                            value: scheme.schemeName,
                            label: scheme.schemeName,
                        }))}
                    />
                </div>
            ))}
        </div>
    )
}

export default EditSchemeAllocation

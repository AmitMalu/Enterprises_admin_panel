import { useEffect, useRef, useState } from "react";
import TextComponent from "../../Components/Atoms/TextComponent";
import { useLocation, useNavigate } from "react-router-dom";
import BreadCrumb from "../../Components/Molecules/BreadCrumb";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import { DeactivateIcon } from "../../assets/Icons";
import { Grid, Tabs, Tooltip } from "@mantine/core";
import SchemeConfigurationForm from "../../Components/Organisms/SchemeConfigurationForm";
import SlabStructureTab from "../../Components/Organisms/SlabStructureTab";
import { fetchSchemeById, fetchSchemeByIdPost } from "../../Redux/Features/Schemes/thunks";
import { buildSlabPayload, getFilteredSlabHeaders, makeBlankSlab, productHeaders, SCHEME_RATE_KEY, SCHEME_RATE_URL, SchemeDetails, SCHEMES_URL, SlabPayload, SlabStructureTableType } from "../../Config/Schemes/SchemesConfig";
import { useAppDispatch } from "../../Redux/hooks";
import { toast } from "react-toastify";
import { useThrottleMasterFormSubmit } from "../../Utils/hooks/useThrottleMasterFormSubmit";
import { OperatorSlabData } from "../../Config/Schemes/SchemesConfig";
import { updateMasterItem } from "../../Redux/Features/Masters/MastersThunk";
import VerticalKeyValueTable from "../../Components/Organisms/VerticalKeyValueTable";

const SchemeSettingsPage = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation();
  const { schemeCode, schemeName } = location.state || {};

  const [activeTab, setActiveTab] = useState<"slab" | "product">("slab");
  const [schemeDetails, setSchemeDetails] = useState<SchemeDetails | null>(null);
  const [editableRows, setEditableRows] = useState<OperatorSlabData[]>([]);
  const [updatedOperators, setUpdatedOperators] = useState<OperatorSlabData[]>([]);
  const updatedOperatorsRef = useRef(updatedOperators);
  const [isSchemeActive, setIsSchemeActive] = useState<boolean | null>(false);
  const isSchemeActiveRef = useRef(isSchemeActive);

  const [productDetails, setProductDetails] = useState<Record<string, any> | null>(null);
  const [loadingScheme, setLoadingScheme] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false);

  const handleRowChange = (
    operatorCode: string,
    slabId: number | string,
    key: keyof SlabStructureTableType,
    value: any
  ) => {
    /* ---------- 1. update live UI copy ---------- */
    setEditableRows(prev =>
      prev.map(op =>
        op.operatorCode !== operatorCode
          ? op
          : {
            ...op,
            slabs: op.slabs.map(s =>
              s.id === slabId ? { ...s, [key]: value } : s
            ),
          }
      )
    );

    /* ---------- 2. build / merge diff ---------- */
    setUpdatedOperators(prev => {
      // find existing operator entry (if any)
      const opIdx = prev.findIndex(op => op.operatorCode === operatorCode);
      const opEntry: OperatorSlabData =
        opIdx !== -1
          ? { ...prev[opIdx] }
          : {
            operatorCode,
            operatorName:
              schemeDetails?.operators?.find(o => o.operatorCode === operatorCode)
                ?.operatorName || "",
            slabs: [],
          };

      // find existing diff for this slab (if any)
      const slabIdx = opEntry.slabs.findIndex(s => s.id === slabId);
      const baseSlab =
        slabIdx !== -1
          ? opEntry.slabs[slabIdx]                // ← already‑edited version
          : schemeDetails?.operators              // else fall back to original
            ?.find(o => o.operatorCode === operatorCode)
            ?.slabs.find(s => s.id === slabId) || { id: slabId } as any;

      const updatedSlab = { ...baseSlab, [key]: value };

      // Check if slab is now identical to original
      const original = schemeDetails?.operators
        ?.find(o => o.operatorCode === operatorCode)
        ?.slabs.find(s => s.id === slabId);

      const isSameAsOriginal =
        original && JSON.stringify(original) === JSON.stringify(updatedSlab);

      /* -- insert, update, or remove in opEntry.slabs -- */
      if (isSameAsOriginal) {
        // remove diff if slab reverted
        if (slabIdx !== -1) opEntry.slabs.splice(slabIdx, 1);
      } else {
        // upsert diff
        if (slabIdx !== -1) opEntry.slabs[slabIdx] = updatedSlab;
        else opEntry.slabs.push(updatedSlab);
      }

      // build new updatedOperators array
      const next = [...prev];
      if (opEntry.slabs.length === 0) {
        // no diffs left for this operator → remove operator entry
        if (opIdx !== -1) next.splice(opIdx, 1);
      } else if (opIdx !== -1) {
        next[opIdx] = opEntry;
      } else {
        next.push(opEntry);
      }

      return next;
    });
  };

  const toggleSchemeStatus = async () => {
    if (!schemeCode) {
      toast.error("Scheme code is required to toggle status");
      return;
    }
    const nextStatus = !isSchemeActiveRef.current;

    try {
      setLoadingScheme(true);
      const response = await dispatch(
        updateMasterItem({
          key: "schemeStatus",
          url: `${SCHEMES_URL}`,
          id: `${schemeCode}/status?isActive=${nextStatus}`,
        })
      ).unwrap();

      if (response.statusCode === 200) {
        toast.success(response.message || "Scheme status updated successfully");
        setIsSchemeActive(nextStatus); // update local status
      } else {
        toast.error(response.message || "Failed to update Scheme status");
      }
    } catch (error: any) {
      toast.error(error || "An error occurred while updating scheme status");
    } finally {
      setLoadingScheme(false);
    }
  }

  const handleSubmit = useThrottleMasterFormSubmit<SlabPayload>({
    mode: "edit",
    dispatch,
    navigate,
    masterKey: SCHEME_RATE_KEY,
    addUrl: `${SCHEME_RATE_URL}/save`,
    updateUrl: `${SCHEME_RATE_URL}/update-slabs`,
    successNavigatePath: "/schemes/schemeslist",
    entityName: "SchemeRate",
    delay: 5000,
  });

  const handleSave = () => {
    const currentOperators = updatedOperatorsRef.current;

    if (currentOperators.length === 0) {
      toast.info("No changes to save");
      return;
    }

    const payload = buildSlabPayload(schemeCode, schemeName, currentOperators);

    handleSubmit(payload);
  }

  const handleAddRow = (operatorCode: string) => {
    const operatorIdx = editableRows.findIndex(
      (op) => op.operatorCode === operatorCode
    );

    if (operatorIdx === -1) return;

    const operator = editableRows[operatorIdx];
    const headers = getFilteredSlabHeaders(operator.slabs);
    const newSlab = makeBlankSlab(headers);

    // Add slab to editableRows
    const updatedEditable = [...editableRows];
    updatedEditable[operatorIdx] = {
      ...operator,
      slabs: [...operator.slabs, newSlab],
    };
    setEditableRows(updatedEditable);

    // Add slab to updatedOperators
    const updatedDiff = [...updatedOperators];
    const diffIndex = updatedDiff.findIndex(
      (op) => op.operatorCode === operatorCode
    );

    if (diffIndex !== -1) {
      updatedDiff[diffIndex].slabs.push(newSlab);
    } else {
      updatedDiff.push({
        operatorCode,
        operatorName: operator.operatorName,
        slabs: [newSlab],
      });
    }

    setUpdatedOperators(updatedDiff);
  };

  useEffect(() => {
    updatedOperatorsRef.current = updatedOperators;
  }, [updatedOperators]);

  useEffect(() => {
    isSchemeActiveRef.current = isSchemeActive;
  }, [isSchemeActive]);

  useEffect(() => {
    if (!schemeCode) return;

    const schemeRates = async () => {
      setLoadingScheme(true);
      try {
        const data = await dispatch(
          fetchSchemeById({ key: SCHEME_RATE_KEY, endpoint: `${SCHEME_RATE_URL}`, id: schemeCode })
        ).unwrap();
        setSchemeDetails(data);
        setIsSchemeActive(false);

      } catch (err: any) {
        toast.error(err);
        setTimeout(() => {
          navigate("/schemes/schemeslist");
        }, 2000);
      }
      finally {
        setLoadingScheme(false);
      }
    }
    schemeRates()
  }, [schemeCode])

  useEffect(() => {
    if (schemeDetails?.operators?.length) {
      // Deep clone to preserve immutability
      setEditableRows(JSON.parse(JSON.stringify(schemeDetails.operators)));
    }
  }, [schemeDetails]);

  // Lazy load product tab
  useEffect(() => {
    if (activeTab === "product" && schemeCode && !productDetails) {
      const fetchProductDetails = async () => {
        setLoadingProduct(true);
        try {
          const res = await dispatch(
            fetchSchemeByIdPost({
              key: "product",
              endpoint: `${SCHEME_RATE_URL}/get-product-details-by`,
              id: schemeCode,
            })
          ).unwrap();

          setProductDetails(res);
        } catch (err) {
          toast.error("Failed to load product details");
        } finally {
          setLoadingProduct(false);
        }
      };

      fetchProductDetails();
    }
  }, [activeTab, schemeCode, productDetails]);


  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      {/* Header Section */}
      <div className="flex justify-between">
        <div>
          {/* Heading */}
          <TextComponent
            color="#1D1F2C"
            fontFamily="Inter"
            fontWeight={600}
            fontSize={22}
          >
            {schemeName ? schemeName : "Scheme Name"}
          </TextComponent>

          {/*Sub Heading */}
          <div className="mt-2">
            <BreadCrumb
              type={schemeCode ? schemeCode : "Scheme Code"}
              text="PG"
            />
          </div>
        </div>

        {/* Button */}
        <div className="flex items-end">
          <Tooltip label={isSchemeActive ? "Click to Deactivate Scheme" : "Click to Activate Scheme"}>
            <ButtonComponent
              style={{ padding: "5px 10px", height: 40 }}
              radius={8}
              onClick={toggleSchemeStatus}
              font="Inter"
              textColor="#fff"
              bgColor={isSchemeActive ? "#BF0204" : "#28a745"}
              fontSize="14"
              leftIcon={isSchemeActive ? <DeactivateIcon /> : null}
              disabled={!!loadingScheme}
            >
              {isSchemeActive ? "Deactivate" : "Activate"}
            </ButtonComponent>
          </Tooltip>
        </div>
      </div>

      <Grid gutter="xl" className="flex flex-1 mt-4 ">
        {/* Left Side Tab */}
        <Grid.Col
          span={{ base: 12, md: 8.5, lg: 8.5 }}
          className="overflow-auto max-h-[300px] md:max-h-[calc(100vh-150px)] scrollbar-hide"
        >
          {/*Tab Switcher */}
          <Tabs
            variant="unstyled"
            onChange={(value) => {
              if (value === "slab" || value === "product") setActiveTab(value);
            }}
            defaultValue="slab"
            value={activeTab}
            classNames={{
              list: "flex w-full border border-[#DCDCDC] overflow-hidden",
              tab: `
      text-sm font-medium px-4 py-2 transition-all cursor-pointer 
      data-[active=true]:bg-white data-[active=true]:text-[#CA4343]
      data-[active=false]:bg-[#F7F7F7] data-[active=false]:text-[#3D3D3D]
    `,
            }}
          >
            <Tabs.List grow>
              <Tabs.Tab
                style={{ borderRight: "1px solid #DCDCDC" }}
                value="slab"
              >
                Slab Structure
              </Tabs.Tab>
              <Tabs.Tab value="product">
                Product Details
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="slab" pt="xs">
              <SlabStructureTab
                data={editableRows}
                loading={loadingScheme}
                onDataChange={handleRowChange}
                showAddRow={true}
                onAddRow={handleAddRow}
              />
            </Tabs.Panel>

            <Tabs.Panel value="product" pt="xs">
              <VerticalKeyValueTable loading={loadingProduct} data={productDetails || {}} headers={productHeaders} />
            </Tabs.Panel>
          </Tabs>
        </Grid.Col>

        {/* Right Side Form */}
        <Grid.Col span={{ base: 12, md: 3.5, lg: 3.5 }}>
          <SchemeConfigurationForm />
        </Grid.Col>

        {updatedOperators.length !== 0 && (
          <div className="absolute bottom-0 right-0 p-4">
            <ButtonComponent onClick={handleSave} bgColor="#BF0204" textColor="#fff" radius={8} font="Inter" fontSize="14">
              Save Changes
            </ButtonComponent>
          </div>
        )}
      </Grid>
    </div>
  );
};

export default SchemeSettingsPage;

import { useEffect, useState } from "react";
import TextComponent from "../../Components/Atoms/TextComponent";
import { useLocation, useNavigate } from "react-router-dom";
import BreadCrumb from "../../Components/Molecules/BreadCrumb";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import { DeactivateIcon } from "../../assets/Icons";
import { Grid, Tabs } from "@mantine/core";
import SchemeConfigurationForm from "../../Components/Organisms/SchemeConfigurationForm";
import SlabStructureTab from "../../Components/Organisms/SlabStructureTab";
import { fetchSchemeById, fetchSchemeByIdPost } from "../../Redux/Features/Schemes/thunks";
import { SCHEME_RATE_KEY, SCHEME_RATE_URL, SlabStructureTableType } from "../../Config/Schemes/SchemesConfig";
import { useAppDispatch } from "../../Redux/hooks";
import { toast } from "react-toastify";

interface OperatorData {
  operatorCode: string;
  operatorName: string;
  slabs: SlabStructureTableType[];
}

interface SchemeDetails {
  schemeName: string;
  schemeCode: string;
  operators: OperatorData[];
}

const SchemeSettingsPage = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation();
  const { schemeCode, schemeName } = location.state || {};

  const [activeTab, setActiveTab] = useState<"slab" | "product">("slab");
  const [schemeDetails, setSchemeDetails] = useState<SchemeDetails | null>(null);
  const [editableRows, setEditableRows] = useState<OperatorData[]>([]);
  const [updatedOperators, setUpdatedOperators] = useState<OperatorData[]>([]);

  console.log(updatedOperators, "updatedRows");

  const [productDetails, setProductDetails] = useState(null);
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
      const opEntry: OperatorData =
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

  useEffect(() => {
    if (!schemeCode) return;

    const schemeRates = async () => {
      setLoadingScheme(true);
      try {
        const data = await dispatch(
          fetchSchemeById({ key: SCHEME_RATE_KEY, endpoint: `${SCHEME_RATE_URL}`, id: schemeCode })
        ).unwrap();
        setSchemeDetails(data);

      } catch (err: any) {
        toast.error(err);
        setTimeout(() => {
          // navigate("/schemes/schemeslist");
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
    if (activeTab === "product" && !productDetails) {
      const fetchProductDetails = async () => {
        setLoadingProduct(true);
        try {
          const res = await dispatch(
            fetchSchemeByIdPost({ key: "product", endpoint: `${SCHEME_RATE_URL}/get-product-details-by`, id: schemeCode })
          ).unwrap();
          setProductDetails(res.data);
        } catch (err) {
          toast.error("Failed to load product details");
        } finally {
          setLoadingProduct(false);
        }
      };
      fetchProductDetails();
    }
  }, [activeTab]);


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
          <ButtonComponent
            style={{ padding: "5px 10px", height: 40 }}
            radius={8}
            font="Inter"
            textColor="#fff"
            bgColor="#CA4343"
            fontSize="14"
            leftIcon={<DeactivateIcon />}
            disabled={!!loadingScheme}
          >
            Deactivate
          </ButtonComponent>
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
              <Tabs.Tab value="product">Product Details</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="slab" pt="xs">
              <SlabStructureTab
                data={editableRows}
                loading={loadingScheme}
                onDataChange={handleRowChange} />
            </Tabs.Panel>

            <Tabs.Panel value="product" pt="xs">
              Product Details Content Here
            </Tabs.Panel>
          </Tabs>
        </Grid.Col>

        {/* Right Side Form */}
        <Grid.Col span={{ base: 12, md: 3.5, lg: 3.5 }}>
          <SchemeConfigurationForm />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default SchemeSettingsPage;

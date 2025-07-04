import { useEffect, useState } from "react";
import TextComponent from "../../Components/Atoms/TextComponent";
import { useLocation, useNavigate } from "react-router-dom";
import BreadCrumb from "../../Components/Molecules/BreadCrumb";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import { DeactivateIcon } from "../../assets/Icons";
import { Grid, Tabs } from "@mantine/core";
import SchemeConfigurationForm from "../../Components/Organisms/SchemeConfigurationForm";
import SlabStructureTab from "../../Components/Organisms/SlabStructureTab";
import { fetchSchemeById } from "../../Redux/Features/Schemes/thunks";
import { SCHEME_RATE_KEY, SCHEME_RATE_URL } from "../../Config/Schemes/SchemesConfig";
import { useAppDispatch } from "../../Redux/hooks";
import { toast } from "react-toastify";

const SchemeSettingsPage = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation();
  const { schemeCode, schemeName } = location.state || {};

  const [activeTab, setActiveTab] = useState<"slab" | "product">("slab");
  const [schemeDetails, setSchemeDetails] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [loadingScheme, setLoadingScheme] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false);

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

  // Lazy load product tab
  // useEffect(() => {
  //   if (activeTab === "product" && !productDetails) {
  //     const fetchProductDetails = async () => {
  //       setLoadingProduct(true);
  //       try {
  //         const res = await dispatch(
  //           fetchSchemeById({ key: "product", endpoint: `/scheme/product-details`, id: schemeCode })
  //         ).unwrap();
  //         setProductDetails(res.data);
  //       } catch (err) {
  //         toast.error("Failed to load product details");
  //       } finally {
  //         setLoadingProduct(false);
  //       }
  //     };
  //     fetchProductDetails();
  //   }
  // }, [activeTab]);


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
              <SlabStructureTab data={schemeDetails} loading={loadingScheme} />
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

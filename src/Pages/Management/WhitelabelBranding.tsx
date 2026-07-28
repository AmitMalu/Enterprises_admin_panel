import { useEffect, useRef, useState } from "react";
import { useFetchMasterList } from "../../Utils/hooks/useFetchMasterList";
import {
  TENANT_KEY,
  TENANT_URL,
  WhitelabelBrandingTableType,
  headers,
} from "../../Config/Management/WhitelabelBrandingConfig";
import TextComponent from "../../Components/Atoms/TextComponent";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import { useNavigate } from "react-router-dom";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import { exportToCsv } from "../../Utils/utils";
import { toast } from "react-toastify";
import { EditIcon } from "../../assets/Icons";

const WhitelabelBranding = () => {
  const navigate = useNavigate();

  const [refreshKey, setRefreshKey] = useState(0);
  const dataRef = useRef<WhitelabelBrandingTableType[] | null>(null);

  const { data, loading, error, pagination, setPage, setPageSize } =
    useFetchMasterList<WhitelabelBrandingTableType>({
      key: TENANT_KEY,
      url: TENANT_URL,
      refreshKey,
    });

  const handleExportClick = () => {
    const currentData = dataRef.current;
    if (!currentData || currentData.length === 0) {
      toast.warning("No data available to export.");
      return;
    }
    exportToCsv(currentData, "whitelabel-branding");
  };

  const handleAdd = () => {
    navigate("/management/whitelabel-branding/add");
  };

  const handleEdit = (id: string) => {
    navigate(`/management/whitelabel-branding/edit/${id}`, { state: id });
  };

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      <TextComponent fontSize={22} fontFamily="Inter" fontWeight={600}>
        Whitelabel Branding
      </TextComponent>

      <GenericMasterToolbar
        addButtonText="Add Branding"
        onAdd={handleAdd}
        onRefresh={() => setRefreshKey((prev) => prev + 1)}
        onExport={handleExportClick}
        loading={loading}
        error={error ? error.toString() : null}
      />

      {loading ? (
        <ShimmerTableRows rowCount={4} columnCount={headers.length} />
      ) : (
        <GenericMasterTable<WhitelabelBrandingTableType>
          data={data}
          headers={headers}
          renderExtraHeader={() => <></>}
          renderExtraRowCell={(item) => (
            <div className="flex justify-center gap-2">
              <span
                onClick={() => handleEdit(String(item?.whiteLabelId ?? ""))}
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
          message={`Showing page ${pagination.currentPage} of ${pagination.totalPages}`}
        />
      )}
    </div>
  );
};

export default WhitelabelBranding;

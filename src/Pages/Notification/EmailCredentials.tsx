import { useEffect, useRef, useState } from "react";
import { useFetchMasterList } from "../../Utils/hooks/useFetchMasterList";
import {
  EMAIL_CREDENTIALS_KEY,
  EMAIL_CREDENTIALS_URL,
  EmailCredentialsTableType,
  headers,
} from "../../Config/Notifications/EmailCredentialsConfig";
import TextComponent from "../../Components/Atoms/TextComponent";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import { useNavigate } from "react-router-dom";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import { exportToCsv } from "../../Utils/utils";
import { toast } from "react-toastify";
import { EditIcon } from "../../assets/Icons";

const EmailCredentials = () => {
  const navigate = useNavigate();

  const [refreshKey, setRefreshKey] = useState(0);
  const dataRef = useRef<EmailCredentialsTableType[] | null>(null);

  const { data, loading, error, pagination, setPage, setPageSize } =
    useFetchMasterList<EmailCredentialsTableType>({
      key: EMAIL_CREDENTIALS_KEY,
      url: EMAIL_CREDENTIALS_URL,
      refreshKey,
    });

  const handleExportClick = () => {
    const currentData = dataRef.current;
    if (!currentData || currentData.length === 0) {
      toast.warning("No data available to export.");
      return;
    }
    exportToCsv(currentData, "email-credentials");
  };

  const handleAdd = () => {
    navigate("/notification/email-credentials/add");
  };

  const handleEdit = (id: string) => {
    navigate(`/notification/email-credentials/edit/${id}`, { state: id });
  };


  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      {/* Heading + Add Button */}
      <TextComponent fontSize={22} fontFamily="Inter" fontWeight={600}>
        Mail Credentials
      </TextComponent>

      <GenericMasterToolbar
        addButtonText="Add Credential"
        onAdd={handleAdd}
        onRefresh={() => setRefreshKey((prev) => prev + 1)}
        onExport={handleExportClick}
        loading={loading}
        error={error ? error.toString() : null}
      />

      {/* Table */}
      {loading ? (
        <ShimmerTableRows rowCount={4} columnCount={headers.length} />
      ) : (
        <GenericMasterTable<EmailCredentialsTableType>
          data={data}
          headers={headers}
          renderExtraHeader={() => <></>} // empty header for action column
          renderExtraRowCell={(item) => (
            <div className="flex justify-center gap-2">
              <span
                onClick={() => handleEdit(String(item?.id ?? ""))}
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

export default EmailCredentials;

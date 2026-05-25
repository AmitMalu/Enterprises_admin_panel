import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Redux/hooks";
import { useEffect, useRef, useState } from "react";
import { headers, NotificationTableType, NOTIFICATIONS_KEY, NOTIFICATIONS_URL } from "../../Config/Notifications/NotificationsConfig";
import { useFetchMasterList } from "../../Utils/hooks/useFetchMasterList";
import { toast } from "react-toastify";
import { exportToCsv, pageSizeSelectData } from "../../Utils/utils";
import TextComponent from "../../Components/Atoms/TextComponent";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import { resetMaster, setPagination } from "../../Redux/Features/Masters/MastersSlice";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import { AddIconSvg } from "../../assets/Icons";
import { colors } from "../../theme/colors";
import CustomDateRangePicker from "../../Components/Atoms/CustomDateRangePicker";
import { DatesRangeValue } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import moment from "moment";
import { Grid } from "@mantine/core";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";

const AlertType = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [filterVisible, setFilterVisible] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [refreshKey, setRefreshKey] = useState(0);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    headers.map((h) => h.key as string)
  );
  const dataRef = useRef<NotificationTableType[] | null>(null);
  const [submittedFilter, setSubmittedFilter] = useState<Record<string, any> | null>(null);

  const initialDateRange = [
    moment().subtract(6, "days").toDate(), // from: 6 days ago
    moment().toDate(), // to: today
  ] as DatesRangeValue;

  // Date range state
  const [selectedDate, setSelectedDate] = useState<DatesRangeValue>(initialDateRange);

  const { data, loading, error, pagination, setPage, setPageSize } =
    useFetchMasterList<NotificationTableType>({
      key: NOTIFICATIONS_KEY,
      url: selectedDate && selectedDate[0] && selectedDate[1] ? `${NOTIFICATIONS_URL}` : undefined,
      filter: selectedDate && selectedDate[0] && selectedDate[1] ? { ...submittedFilter, fromDate: moment(selectedDate[0]).format("YYYY-MM-DD"), toDate: moment(selectedDate[1]).format("YYYY-MM-DD") } : submittedFilter,
      refreshKey,
      defaultPageSize: 5
    });

  const handleAdd = () => {
    navigate(`/notification/alert-type/add`);
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleFilterSubmit = (key: string, value: any) => {
    dispatch(
      setPagination({
        key: NOTIFICATIONS_KEY,
        pagination: { ...pagination, currentPage: 1, pageSize: pagination.pageSize },
      })
    );
    setSubmittedFilter((prev) => ({ ...prev, [key]: value }));
  };

  const handleDateRangeChange = (val: DatesRangeValue) => {
    setSelectedDate(val);

    if (val && val[0] && val[1]) {
      // Only trigger API when both dates are selected
      const formattedFromDate = moment(val[0]).format("YYYY-MM-DD");
      const formattedToDate = moment(val[1]).format("YYYY-MM-DD");
      handleFilterSubmit('fromDate', formattedFromDate);
      handleFilterSubmit('toDate', formattedToDate);
    } else {
      // Clear date filter - don't trigger API for partial selection
      const newFilter = { ...submittedFilter };
      delete newFilter?.fromDate;
      delete newFilter?.toDate;
      setSubmittedFilter(newFilter);
    }
  };

  const handleExportClick = () => {
    const currentData = dataRef.current;
    if (!currentData || currentData.length === 0) {
      toast.warning("No data available to export.");
      return;
    }
    exportToCsv(currentData, "Notifications");
  };

  const handleToggleColumn = (key: string) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleToggleAllColumns = (selectAll: boolean) => {
    if (selectAll) {
      setVisibleColumns(headers.map((h) => h.key as string));
    } else {
      setVisibleColumns([]);
    }
  };

  const handleRefresh = () => {
    dispatch(resetMaster(NOTIFICATIONS_KEY));
    setFilterValues({});
    setSubmittedFilter(null);
    setVisibleColumns(headers.map((h) => h.key as string));
    setSelectedDate(initialDateRange);
    setRefreshKey((prev) => prev + 1);
    setFilterVisible(false);
  };

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      {/* Heading */}
      <TextComponent fontSize={22} fontFamily="Inter" fontWeight={600}>
        Alert Type Notifications
      </TextComponent>

      {/* Toolbar with Date Range and Add Button */}
      <Grid mt={4}>
        <Grid.Col span={{ xs: 4 }}>
          <CustomDateRangePicker
            placeholder="Select date range"
            size="sm"
            shortcuts
            value={selectedDate}
            onChange={(val: DatesRangeValue) => {
              handleDateRangeChange(val);
            }}
            required
            leftIcon={<IconCalendar size={16} />}
          />
        </Grid.Col>

        <Grid.Col span={{ xs: "auto" }}>
          <div className="flex justify-end items-center">
            <ButtonComponent
              fontSize="14"
              fullWidth={false}
              radius={6}
              size="sm"
              borderColor={colors.text.inverse}
              variant="filled"
              bgColor={colors.brand.primary}
              textColor={colors.text.inverse}
              onClick={handleAdd}
              disabled={!!loading}
              leftIcon={<AddIconSvg />}
            >
              Add Notification
            </ButtonComponent>
          </div>
        </Grid.Col>
      </Grid>

      <GenericMasterToolbar
        onRefresh={handleRefresh}
        onColumnChange={handleToggleColumn}
        onToggleAll={handleToggleAllColumns}
        onExport={handleExportClick}
        onFilter={() => setFilterVisible((prev) => !prev)}
        headers={headers}
        visibleColumns={visibleColumns}
        loading={loading}
        error={error ? error.toString() : null}
      />

      {/*Table */}
      {loading ? (
        // Render shimmer
        <ShimmerTableRows rowCount={6} columnCount={headers.length} />
      ) : (
        <GenericMasterTable<NotificationTableType>
          data={data}
          headers={headers.filter((h) =>
            visibleColumns.includes(h.key as string)
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
    </div>
  );
};

export default AlertType;

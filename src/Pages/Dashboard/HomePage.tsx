import { useEffect, useState } from "react";
// import { useAppDispatch } from "../../Redux/hooks";
import { toast } from "react-toastify";
import TextComponent from "../../Components/Atoms/TextComponent";
import { Grid } from "@mantine/core";
import CustomDateRangePicker from "../../Components/Atoms/CustomDateRangePicker";
import { DatesRangeValue } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import DashboardCard from "../../Components/Molecules/DashboardCards";
import DashboardLineGraph from "../../Components/Molecules/DashboardLineGraph";
import { DateRangeLabel, getLabelFromRange, getRangeFromLabel } from "../../Utils/dateRangeUtils";
import moment from "moment";
import DashboardBarGraph from "../../Components/Molecules/DashboardBarGraph";

const data = {
  "cards": [
    {
      "value": "10871.00",
      "label": "TRANSACTION VOLUME"
    },
    {
      "value": "0.10",
      "label": "COMMISSION EARNED"
    },
    {
      "value": "46",
      "label": "PENDING TRANSACTION"
    },
    {
      "value": "10871.00",
      "label": "TRANSACTION VOLUME"
    },
    {
      "value": "0.10",
      "label": "COMMISSION EARNED"
    },
    {
      "value": "46",
      "label": "PENDING TRANSACTION"
    }
  ],
  "barGraphData": [
    {
      "volume": 10000,
      "product": "PG"
    },
    {
      "volume": 9000,
      "product": "PAYOUT"
    },
    {
      "volume": 5000,
      "product": "DMT"
    },
    {
      "volume": 2000,
      "product": "AEPS"
    },
    {
      "volume": 7000,
      "product": "BBPS"
    }
  ],
  "lineGraphData": [
    {
      "transaction": 14,
      "product": "PG"
    },
    {
      "transaction": 18,
      "product": "PAYOUT"
    },
    {
      "transaction": 2,
      "product": "DMT"
    },
    {
      "transaction": 5,
      "product": "AEPS"
    },
    {
      "transaction": 11,
      "product": "BBPS"
    }
  ]
}

const HomePage = () => {
  // const dispatch = useAppDispatch();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DatesRangeValue>(
    getRangeFromLabel("Last 7 Days")
  );
  const [selectedLabel, setSelectedLabel] =
    useState<DateRangeLabel>("Last 7 Days");

  const today = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(today.getMonth() - 6);
  console.log(isLoading);

  const colors = [
    "#D82226",
    "#1E6F65",
    "#B37305",
    "#D97706",
  ];

  const cards =
    dashboardData?.cards?.map((card: any, index: number) => ({
      label: card.label,       // from API
      value: card.value,       // from API
      prefix: card.prefix || "₹",             // always ₹
      borderColor: card.color || colors[index % colors.length], // rotate colors
    })) || [];

  // Bar graph
  const barGraphData = dashboardData?.barGraphData || [];

  // Line Graph
  const lineGraphData = dashboardData?.lineGraphData || [];

  const dashboardDataReq = async () => {

    if (!selectedDate) return;
    const [fromDate, toDate] = selectedDate;
    if (!fromDate || !toDate) return;
    console.log("api hit", selectedDate);
    try {
      setIsLoading(true);
      // Format dates as YYYY-MM-DD (or your API format)
      const payload = {
        fromDate: moment(fromDate).format("YYYY-MM-DD"),
        toDate: moment(toDate).format("YYYY-MM-DD"),
      };
      console.log(payload);
      
      // const response = await dispatch(Dashboard_Api(payload)).unwrap();
      // setDashboardData(response.data?.data)
      setDashboardData(data)

    } catch (error: any) {
      await toast.error(error.message || "Error Fetching Dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dashboardDataReq();
  }, [])

  // Update label when date changes
  useEffect(() => {
    setSelectedLabel(getLabelFromRange(selectedDate));
  }, [selectedDate]);

  // Refetch dashboard data on date or login change
  useEffect(() => {
    dashboardDataReq();
  }, [selectedDate]);

  console.log(dashboardData, "das");


  return (
    <div className="h-[calc(100vh-90px)] mx-auto p-4 items-center justify-center">
      <TextComponent fontSize={20} fontWeight={600}>
        {selectedLabel}
      </TextComponent>
      <Grid gutter="md" mt={4}>
        <Grid.Col span={{ sm: 6, md: 3 }}>
          <CustomDateRangePicker
            placeholder="Select date range"
            size="sm"
            shortcuts
            minDate={sixMonthsAgo}
            maxDate={today}
            value={selectedDate}
            onChange={(val: DatesRangeValue) => {
              setSelectedDate(val);
            }}
            required
            leftIcon={<IconCalendar size={16} />}
          />
        </Grid.Col>
      </Grid>

      <Grid gutter="md" mt={10}>
        {cards.map((item: any, index: number) => (
          <Grid.Col key={index} span={{ base: 6, md: 3 }}>
            <DashboardCard {...item} />
          </Grid.Col>
        ))}
      </Grid>

      <Grid gutter="lg" align="stretch" mt={4}>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <DashboardBarGraph graphData={barGraphData} />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <DashboardLineGraph
            graphData={lineGraphData}
          />
        </Grid.Col>
      </Grid>
    </div >
  );
};

export default HomePage;

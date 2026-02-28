import { Card } from "@mantine/core";
import { BarChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Bar, Tooltip } from "recharts";
import { colors } from "../../theme/colors";

const DashboardBarGraph = ({ graphData }: any) => {
    return (
        <Card shadow="xl" padding="lg" radius="md">
            <ResponsiveContainer width="100%" height={260}>
                <BarChart data={graphData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="product" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="volume" fill={colors.chart.primary} />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default DashboardBarGraph;

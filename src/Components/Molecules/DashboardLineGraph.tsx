import { Card } from "@mantine/core"
import { LineChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Line, Tooltip } from 'recharts'

const DashboardLineGraph = ({ graphData }: any) => {

    return (
        <Card shadow="xl" padding="lg" radius="md">
            <ResponsiveContainer width="100%" height={260}>
                <LineChart data={graphData}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="product" />
                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="transaction"
                        stroke="#DC2626"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Card>
    )
}

export default DashboardLineGraph

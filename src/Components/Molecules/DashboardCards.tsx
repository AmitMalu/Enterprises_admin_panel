import TextComponent from "../Atoms/TextComponent";
import { colors } from "../../theme/colors";

type DashboardCardProps = {
    label: string;
    value: string | number;
    borderColor: string;
    prefix?: string;  // e.g. ₹ or $ (optional)
    suffix?: string;  // optional (e.g. "transactions")
};

export default function DashboardCard({
    label,
    value,
    borderColor,
    prefix = "",
    suffix = "",
}: DashboardCardProps) {
    return (
        <div
            className="p-5 rounded-xl shadow-sm bg-white border"
            style={{ borderColor }}
        >
            <TextComponent fontSize={20} fontWeight={600} color={colors.text.title}>
                {prefix} {value} {suffix}
            </TextComponent>
            <div>
                <TextComponent fontSize={14} fontWeight={500} color={colors.text.tertiary}>
                    {label}
                </TextComponent>
            </div>
        </div>
    );
}

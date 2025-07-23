// components/BackHeader.tsx
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import TextComponent from "../Atoms/TextComponent";

interface BackHeaderProps {
    title: string;
    backPath: string;
    tooltipLabel?: string;
}

const BackHeader = ({ title, backPath, tooltipLabel = "Go Back" }: BackHeaderProps) => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center gap-2 mb-1">
            <Tooltip label={tooltipLabel} position="bottom" withArrow>
                <button
                    onClick={() => navigate(backPath)}
                    className="p-1 rounded hover:bg-gray-100 transition"
                    aria-label={tooltipLabel}
                >
                    <IconArrowLeft size={22} stroke={1.8} color="#C30305" />
                </button>
            </Tooltip>

            <TextComponent fontSize={24} fontFamily="Inter" fontWeight={600}>
                {title}
            </TextComponent>
        </div>
    );
};

export default BackHeader;

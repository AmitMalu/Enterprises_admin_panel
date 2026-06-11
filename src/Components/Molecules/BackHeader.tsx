// components/BackHeader.tsx
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import TextComponent from "../Atoms/TextComponent";
import { colors } from "../../theme/colors";

interface BackHeaderProps {
    title: string;
    backPath?: string;
    onBack?: () => void;
    tooltipLabel?: string;
}

const BackHeader = ({ title, backPath, onBack, tooltipLabel = "Go Back" }: BackHeaderProps) => {
    const navigate = useNavigate();

    const handleBack = () => {
        if (backPath) {
            navigate(backPath);
        } else if (onBack) {
            onBack();
        }
    };

    return (
        <div className="flex items-center gap-2 mb-1">
            {(backPath || onBack) && (
                <Tooltip label={tooltipLabel} position="bottom" withArrow>
                    <button
                        onClick={handleBack}
                        className="p-1 rounded hover:bg-gray-100 transition"
                        aria-label={tooltipLabel}
                    >
                        <IconArrowLeft size={22} stroke={1.8} color={colors.brand.primary} />
                    </button>
                </Tooltip>
            )}

            <TextComponent fontSize={24} fontFamily="Inter" fontWeight={600}>
                {title}
            </TextComponent>
        </div>
    );
};

export default BackHeader;

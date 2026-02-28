import { colors } from "../../theme/colors";

const statusColorMap: Record<string, { backgroundColor: string; color: string }> = {
    PENDING: { backgroundColor: colors.status.warning, color: colors.text.inverse },
    SUCCESS: { backgroundColor: colors.status.successAlt, color: colors.text.inverse },
    REJECTED: { backgroundColor: colors.status.dangerVivid, color: colors.text.inverse },
    REFUNDED: { backgroundColor: colors.status.dangerVivid, color: colors.text.inverse },
    FAILED: { backgroundColor: colors.status.dangerSoft, color: colors.text.disabled },
    FAILURE: { backgroundColor: colors.status.dangerSoft, color: colors.text.disabled },
};

const TableStatusBadge = ({ status }: { status: string }) => {
    const badgeStyle = statusColorMap[status.toUpperCase()] || {
        backgroundColor: colors.surface.muted,
        color: colors.text.secondary,
    };

    return (
        <span
            className="px-2 py-[2px] rounded-full text-xs font-medium inline-block whitespace-nowrap"
            style={badgeStyle}
        >
            {status}
        </span>
    );
};

export default TableStatusBadge;

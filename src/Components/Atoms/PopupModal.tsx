import { Modal } from "@mantine/core";
import React from "react";

interface PopupModalProps {
    opened: boolean;
    onClose: () => void;
    title?: string | React.ReactNode; // Make title optional and flexible
    titleSize?: string; // Custom font size
    titleWeight?: number | string; // Font weight like 'bold' or 500
    size?: string | number;
    centered?: boolean;
    withCloseButton?: boolean;
    radius?: string | number;
    padding?: string | number;
    children: React.ReactNode;
}

const PopupModal: React.FC<PopupModalProps> = ({
    opened,
    onClose,
    title,
    titleSize = "18px",
    titleWeight = "bold",
    size = "lg",
    centered = true,
    withCloseButton = true,
    radius = "md",
    padding = "xl",
    children,
}) => {
    return (
        <Modal
            opened={opened}
            onClose={onClose}
            centered={centered}
            withCloseButton={withCloseButton}
            size={size}
            closeOnClickOutside={false}
            closeOnEscape={false}
            radius={radius}
            padding={padding}
            overlayProps={{
                opacity: 0.4,
                blur: 2,
            }}
            title={
                title ? (
                    <div
                        style={{
                            fontSize: titleSize,
                            fontWeight: titleWeight,
                        }}
                    >
                        {title}
                    </div>
                ) : null
            }
        >
            {children}
        </Modal>
    );
};

export default PopupModal;

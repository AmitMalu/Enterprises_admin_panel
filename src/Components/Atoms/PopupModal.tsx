import { Modal } from "@mantine/core";
import React from "react";

interface PopupModalProps {
    opened: boolean;
    onClose: () => void;
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
            radius={radius}
            padding={padding}
            overlayProps={{
                opacity: 0.4,
                blur: 2,
            }}
        >
            {children}
        </Modal>
    );
};

export default PopupModal;

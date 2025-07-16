import { ActionIcon, FileInput, Modal } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useScreenSize } from "../../Utils/hooks/useScreenSize";
import { IconEye } from "@tabler/icons-react";

interface FileInputComponentProps {
  label?: string;
  name: string;
  placeholder?: string;
  accept?: string;
  value: File | string | null;
  onChange: (value: File | null) => void;
  error?: string | boolean;
  required?: boolean;
  withAsterisk?: boolean;
  disabled?: boolean;
  radius?: "xs" | "sm" | "md" | "lg" | "xl";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const FileInputComponent: React.FC<FileInputComponentProps> = ({
  label,
  name,
  placeholder = "Select File",
  accept = "image/png, image/jpeg",
  value,
  onChange,
  radius,
  size,
  error,
  required = false,
  withAsterisk = false,
  disabled = false,
}) => {
  const screenSize = useScreenSize();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (value) {
      if (typeof value === "string") {
        setPreviewUrl(value); // URL from server
      } else {
        const url = URL.createObjectURL(value);
        setPreviewUrl(url);

        return () => URL.revokeObjectURL(url);
      }
    } else {
      setPreviewUrl(null);
    }
  }, [value]);

  const defaultSize =
    size ||
    (screenSize === "sm" || screenSize === "md" || screenSize === "lg"
      ? "sm"
      : screenSize === "xl" || screenSize === "2xl"
        ? "md"
        : screenSize === "3xl"
          ? "lg"
          : "xl");

  const defaultRadius = radius || (screenSize === "3xl" ? "md" : "sm");

  const sharedProps = {
    label,
    name,
    placeholder,
    accept,
    value,
    onChange,
    error: typeof error === "string" ? true : !!error,
    required: withAsterisk || required,
    disabled,
    size: defaultSize,
    radius: defaultRadius,
    styles: {
      input: {
        color: "#282828",
        fontWeight: 500,
      },
    },
    rightSection:
      previewUrl && !error ? (
        <ActionIcon onClick={() => setShowModal(true)}>
          <IconEye size={16} />
        </ActionIcon>
      ) : null,
  };

  return (
    <div>
      <div className="relative">
        <FileInput
          {...sharedProps}
          placeholder={typeof value === "string" ? "" : placeholder}
          value={typeof value === "string" ? null : value} // let it behave normally for File
        />

        {/* Custom filename overlay only when URL (string) */}
        {typeof value === "string" && (
          <div
            className="absolute left-3 top-[70%] -translate-y-1/2 text-gray-700 text-sm truncate pointer-events-none w-[calc(100%-40px)]"
            title={value.split("/").pop()?.slice(-20)}
          >
            {value.split("/").pop()?.slice(-30)}
          </div>
        )}
      </div>

      {typeof error === "string" && (
        <div className="text-red-500 text-sm mt-1">{error}</div>
      )}

      {/* Preview Modal */}
      <Modal
        opened={showModal}
        onClose={() => setShowModal(false)}
        title="Uploaded Preview"
        size="lg"
        centered
      >
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="max-h-[400px] w-full object-contain"
          />
        )}
      </Modal>
    </div>
  );
};

export default FileInputComponent;

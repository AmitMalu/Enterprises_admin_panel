import { Modal, Table } from "@mantine/core";
import * as XLSX from "xlsx";
import { ellipsisCellStyle } from "../../Utils/utils";
import { useState, useEffect } from "react";

interface FilePreviewModalProps {
  file: File | string | null;
  fileName?: string;
  opened: boolean;
  onClose: () => void;
}

const FilePreviewModal = ({ file, fileName, opened, onClose }: FilePreviewModalProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [excelData, setExcelData] = useState<any[][]>([]);

  useEffect(() => {
    let objectUrl: string | null = null;

    if (file) {
      if (typeof file === "string") {
        setPreviewUrl(file);
      } else {
        objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
      }
    } else {
      setPreviewUrl(null);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [file]);

  useEffect(() => {
    const loadExcel = async () => {
      if (file instanceof File && (file.name.endsWith(".xlsx") || file.name.endsWith(".csv"))) {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" }) as any[][];
        setExcelData(json);
      }
    };

    if (opened) {
      loadExcel();
    }
  }, [file, opened]);

  if (!file || !previewUrl) return null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={fileName || "Preview File"}
      size="lg"
      centered
    >
      {file instanceof File && (file.name.endsWith(".xlsx") || file.name.endsWith(".csv")) ? (
        <Table.ScrollContainer minWidth={500} type="native" className="max-h-[400px]">
          <Table striped highlightOnHover withColumnBorders withRowBorders>
            <Table.Thead>
              <Table.Tr>
                {excelData[0]?.map((header, idx) => (
                  <Table.Th key={idx}>{header}</Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {excelData.slice(1).map((row, rowIndex) => (
                <Table.Tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <Table.Td key={colIndex} style={ellipsisCellStyle}>{cell}</Table.Td>
                  ))}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      ) : previewUrl.includes(".pdf") || (file instanceof File && file.type === "application/pdf") ? (
        <iframe src={previewUrl} title="PDF Preview" className="w-full h-[400px]" />
      ) : (
        <img src={previewUrl} alt="Preview" className="max-h-[400px] w-full object-contain" />
      )}
    </Modal>
  );
};

export default FilePreviewModal;

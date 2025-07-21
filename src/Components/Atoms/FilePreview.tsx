import { useEffect, useState } from "react";

const FilePreview = ({ file }: { file: File | null }) => {
  const [fileURL, setFileURL] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileURL(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setFileURL(null);
    }
  }, [file]);

  if (!file || !fileURL) return null;

  const isImage = file.type.startsWith("image/");
  const isPDF = file.type === "application/pdf";

  return (
    <div style={{ marginTop: 10 }}>
      {isImage && <img src={fileURL} alt="preview" width={200} />}
      {isPDF && (
        <object data={fileURL} type="application/pdf" width="100%" height="400px">
          <p>PDF preview not supported</p>
        </object>
      )}
    </div>
  );
};

export default FilePreview;

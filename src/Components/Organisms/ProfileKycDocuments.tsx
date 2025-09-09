import FileInputComponent from "../Atoms/FileInputComponent";

const ProfileKycDocuments = ({ kycDocs }: { kycDocs: any }) => {
    const docs = [
        { label: "Aadhaar Front", name: "aadhaarFront", value: kycDocs?.aadhaarCardFrontImage },
        { label: "Aadhaar Back", name: "aadhaarBack", value: kycDocs?.aadhaarCardBackImage },
        { label: "PAN Card", name: "panCard", value: kycDocs?.panCardImage },
        { label: "Shop Image", name: "shopImage", value: kycDocs?.shopImage },
        { label: "Business Proof", name: "businessProof", value: kycDocs?.businessProofImage },
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            {docs.map((doc, index) => (
                <div key={index} >
                    {doc.value ? (
                        <FileInputComponent
                            label={doc.label}
                            name={doc.name}
                            value={doc.value}
                            onChange={() => { }}
                            showPreviewIcon={true}
                            disabled={true}
                        />
                    ) : (
                        <p className="text-gray-500 text-sm">No document found</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProfileKycDocuments;

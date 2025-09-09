const ProfileBankInfo = ({ myBanks }: { myBanks: any }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[
      { label: "Bank Name", value: myBanks?.bankName },
      { label: "Account Name", value: myBanks?.accountName },
      { label: "Account No", value: myBanks?.accountNo.replace(/\d{8}$/, "********") },
      { label: "IFSC Code", value: myBanks?.ifcscode },
      { label: "Verified", value: myBanks?.verified ? "Yes" : "No" },
    ].map((item, index) => (
      <div key={index}>
        <label className="block text-sm font-medium text-gray-700">{item.label}</label>
        <p className="mt-1 text-gray-900">{item.value}</p>
      </div>
    ))}
  </div>
);
export default ProfileBankInfo
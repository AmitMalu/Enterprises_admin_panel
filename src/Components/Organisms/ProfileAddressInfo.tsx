const ProfileAddressInfo = ({ address }: { address: any }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[
      { label: "Building", value: address?.building },
      { label: "City", value: address?.city },
      { label: "State", value: address?.state },
      { label: "Pin Code", value: address?.pinCode },
    ].map((item, index) => (
      <div key={index}>
        <label className="block text-sm font-medium text-gray-700">{item.label}</label>
        <p className="mt-1 text-gray-900">{item.value}</p>
      </div>
    ))}
  </div>
);
export default ProfileAddressInfo;
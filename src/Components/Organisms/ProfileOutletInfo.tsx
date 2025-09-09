const ProfileOutletInfo = ({ outletAddress }: { outletAddress: any }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[
      { label: "Outlet Building", value: outletAddress?.outletBuilding },
      { label: "City", value: outletAddress?.outletCity },
      { label: "State", value: outletAddress?.outletState },
      { label: "Pin Code", value: outletAddress?.outletPinCode },
    ].map((item, index) => (
      <div key={index}>
        <label className="block text-sm font-medium text-gray-700">{item.label}</label>
        <p className="mt-1 text-gray-900">{item.value}</p>
      </div>
    ))}
  </div>
);
export default ProfileOutletInfo;
const ProfilePersonalInfo = ({ info }: { info: any }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
            { label: "Name", value: info?.name },
            { label: "Member ID", value: info?.memberId },
            { label: "Mobile", value: info?.mobileNumber },
            { label: "Email", value: info?.email },
            // { label: "Date of Birth", value: info?.dob },
            { label: "Status", value: info?.isBlocked ? "Blocked" : "Active" },
        ].map((item, index) => (
            <div key={index}>
                <label className="block text-sm font-medium text-gray-700">{item.label}</label>
                <p className="mt-1 text-gray-900">{item.value}</p>
            </div>
        ))}
    </div>
);

export default ProfilePersonalInfo;
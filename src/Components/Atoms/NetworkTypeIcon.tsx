import React from "react";
import {
  IconBuildingSkyscraper,
  IconBuildingStore,
  IconHierarchy2,
  IconTag,
  IconTruckDelivery,
  IconUsersGroup,
  type Icon,
} from "@tabler/icons-react";

/** Icon for each network level on the Network Creation page. */
const ICONS: Record<string, Icon> = {
  enterprise: IconBuildingSkyscraper,
  "white-label": IconTag,
  "super-distributor": IconHierarchy2,
  partner: IconUsersGroup,
  distributor: IconTruckDelivery,
  retailer: IconBuildingStore,
};

const NetworkTypeIcon: React.FC<{ type: string }> = ({ type }) => {
  const TypeIcon = ICONS[type] ?? IconUsersGroup;
  return (
    <span className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
      <TypeIcon size={24} stroke={1.75} />
    </span>
  );
};

export default NetworkTypeIcon;

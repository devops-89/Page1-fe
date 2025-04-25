import React from "react";
import innerImage from "@/cabs/outstation-cabs.jpg";
import InnerBanner from "@/components/innerBanner";
const OutstationCabs = () => {
  return (
    <div>
      <InnerBanner img={innerImage.src} heading={"Outstation Cabs"} />
    </div>
  );
};

export default OutstationCabs;

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProfileGeneral from "@/components/dashboard/DashboardSection";

import {useState} from "react";

export default function DashboardPage(){
    const [value,setValue]=useState(0);  // default to Profile Tab

    return (
        <DashboardLayout tabValue={value} setTabValue={setValue}>
            <ProfileGeneral/>
        </DashboardLayout>
    )
}


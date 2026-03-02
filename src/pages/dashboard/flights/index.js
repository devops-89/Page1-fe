import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Flight from "@/components/dashboard/Flight";
import {useSelector} from "react-redux";
import {useState} from "react";
export default function FlightListingPage(){
    const userData = useSelector((state) => state?.USER?.UserData);
    const [value,setValue]=useState(1);

    return (
        <DashboardLayout tabValue={value} setTabValue={setValue}>
            <Flight userId={userData?.id} />
        </DashboardLayout>
    )
}
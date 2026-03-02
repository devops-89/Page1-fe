import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Hotel from "@/components/dashboard/Hotel";
import {useState} from "react";
import {useSelector} from "react-redux";

export default function HotelListingPage(){
    const userData = useSelector((state) => state?.USER?.UserData);
    const [value,setValue]=useState(2); // select the Hotel Listing Table tab

    return (
        <DashboardLayout tabValue={value} setTabValue={setValue}>
            <Hotel userId={userData?.id} />
        </DashboardLayout>
    )
}
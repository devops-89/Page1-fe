import DashboardLayout from "@/components/dashboard/DashboardLayout";
import FlightDetail from "@/components/dashboard/FlightDetail";
import {useRouter} from "next/router";
import {useState} from "react";

export default function FlightDetailPage(){
    const router=useRouter();
    const {id}=router.query;
    const [value,setValue]=useState(1); // stay on the flight tab

    return (
        <DashboardLayout tabValue={value} setTabValue={setValue}>
            <FlightDetail id={id}/>
        </DashboardLayout>
    )

}

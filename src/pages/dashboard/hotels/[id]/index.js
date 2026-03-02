import {useState} from "react";
import {useRouter} from "next/router";
import HotelDetail from "@/components/dashboard/HotelDetail";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
export default function HotelDetailPage(){
    const router=useRouter();
    const [value,setValue]=useState(2);
    const {id}=router.query;
    return (
        <DashboardLayout tabValue={value} setTabValue={setValue}>
            <HotelDetail id={id} />
        </DashboardLayout>
    )

}
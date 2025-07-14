import React from 'react'
import Head from "next/head";
import InnerBanner from '@/components/innerBanner';
import packageBanner from "@/tours/banner-tour.png";
import { Box,Typography,Container } from '@mui/material';
import PackageDetail from '@/components/packages/packageDetails';

const packageDetails = () => {
  return (
    <div>
      <Head>
        <title>Package Details</title>
      </Head>

      <InnerBanner img={packageBanner.src} heading={"Package Details"} />
      
     <Container>
       <PackageDetail/>
     </Container>
      </div>
  )
}

export default packageDetails
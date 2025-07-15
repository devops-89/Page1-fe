import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import InnerBanner from '@/components/innerBanner';
import packageBanner from '@/tours/banner-tour.png';
import { Box, Typography, Container } from '@mui/material';
import { packageController } from '@/api/packageController';
import { useRouter } from 'next/router';
import PackageDetail from '@/components/packages/packageDetails';
import ReactLoading from 'react-loading';
import { COLORS } from '@/utils/colors';

const PackageDetails = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return; // wait for router to be ready

    const fetchPackageDetails = async () => {
      try {
        const response = await packageController.getPackageDetails(slug);
        setPackageData(response?.data?.data);
      } catch (err) {
        console.error("Error fetching package details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [slug]);

  return (
    <div>
      <Head>
        <title>Package Details</title>
      </Head>

      <InnerBanner img={packageBanner.src} heading="Package Details" />

      <Container>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={300}>
            <ReactLoading type="bars" color={COLORS.PRIMARY} height={40} width={40} />
          </Box>
        ) : packageData ? (
          <PackageDetail data={packageData} />
        ) : (
          <Typography mt={5} color="error" align="center">
            Package not found.
          </Typography>
        )}
      </Container>
    </div>
  );
};

export default PackageDetails;

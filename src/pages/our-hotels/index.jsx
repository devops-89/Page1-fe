import InnerBanner from "@/components/innerBanner";
import OurHotalCard from "@/components/our-hotels/ourHotalCard";
import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { hotlerController } from "@/api/hotlerController";
import { useDispatch } from "react-redux";
import { setHotelerHotelList } from "@/redux/reducers/hoteler-reducers/HotelerHotelList";
import banner from "@/banner/hotel.jpg";
const OurHotels = () => {
  const [hotelList, setHotelList] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        let response = await hotlerController.fetchAllHotels();
        console.log("Fetched hotel list: ", response.data.data);

        const transformedHotels = response.data.data.map((hotel) => ({
          id: hotel.hotel_id,
          name: hotel.name,
          location: {
            city: hotel.city,
            distanceInfo: hotel.address_line || "",
          },
          tags: [hotel.type],
          services: Object.keys(hotel.amenities)
            .filter((key) => hotel.amenities[key]) // only true values
            .map((key) => key.charAt(0).toUpperCase() + key.slice(1)), // Capitalize
          description: hotel.description,
          images: {
            main: hotel.main_image,
            thumbnails: Array.isArray(hotel.gallery_images)
              ? hotel.gallery_images
              : [],
          },
          rating: {
            label: hotel.star_rating >= 4 ? "Excellent" : "Good",
            score: hotel.star_rating,
            reviewCount: 100, // API doesn’t have, put dummy or remove
          },
          price: {
            original: parseFloat(hotel.base_price),
            discounted: parseFloat(hotel.base_price), // you can add discounts logic
            taxesInfo: `Tax ${hotel.tax_percentage}%`,
          },
          additionalInfo: hotel.cancellation_policy,
        }));

        setHotelList(transformedHotels);
        dispatch(setHotelerHotelList(transformedHotels));
      } catch (error) {
        console.error("API Error: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  return (
    <div>
      <InnerBanner img={banner.src} heading={"Our Hotels"} />
      <Box sx={{ pt: 10, pb: 10 }}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : hotelList.length > 0 ? (
          hotelList.map((cur, index) => <OurHotalCard key={index} data={cur} />)
        ) : (
          <Typography>No data found</Typography>
        )}
      </Box>
    </div>
  );
};

export default OurHotels;

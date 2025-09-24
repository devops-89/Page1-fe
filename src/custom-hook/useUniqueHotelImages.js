import { useMemo } from "react";

// Custom hook
export const useUniqueHotelImages = (hotelDetails) => {
  return useMemo(() => {
    if (!hotelDetails) {
      return {
        mainImage: null,
        roomImages: [],
      };
    }

    const mainImage = hotelDetails.Image || null;

    // Remove duplicate room images using Set
    const uniqueRoomImages = [...new Set(hotelDetails.Images || [])];

    return {
      mainImage,
      roomImages: uniqueRoomImages,
    };
  }, [hotelDetails]);
};

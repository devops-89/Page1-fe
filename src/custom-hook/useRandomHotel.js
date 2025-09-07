import { useMemo } from "react";

export default function useRandomHotel() {
    // const hotel = [
    //  "https://page-one-bucket.s3.us-east-1.amazonaws.com/2073.jpg",
    //  "https://page-one-bucket.s3.us-east-1.amazonaws.com/16093.jpg",
    //  "https://page-one-bucket.s3.us-east-1.amazonaws.com/17925.jpg",
    //  "https://page-one-bucket.s3.us-east-1.amazonaws.com/1676.jpg",
    //  "https://page-one-bucket.s3.us-east-1.amazonaws.com/2149504791.jpg"
    // ];

    const hotel=[
        "/images/randomHotelImages/hotel1.jpg",
        "/images/randomHotelImages/hotel2.jpg",
        "/images/randomHotelImages/hotel3.jpg",
        "/images/randomHotelImages/hotel4.jpg",
        "/images/randomHotelImages/hotel5.jpg",
        "/images/randomHotelImages/hotel6.jpg",
        "/images/randomHotelImages/hotel7.jpg",
        "/images/randomHotelImages/hotel8.jpg",
        "/images/randomHotelImages/hotel9.jpg",
        "/images/randomHotelImages/hotel10.jpg",
        "/images/randomHotelImages/hotel11.jpg",
        "/images/randomHotelImages/hotel12.jpg",
        "/images/randomHotelImages/hotel13.jpg"
    ]

    const randomImage = useMemo(()=>{
      return hotel[Math.floor(Math.random() * hotel.length)];
    },[])

   return randomImage
  }
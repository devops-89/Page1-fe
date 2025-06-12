import { useMemo } from "react";

export default function useRandomHotel() {
    const hotel = [
     "https://page-one-bucket.s3.us-east-1.amazonaws.com/2073.jpg",
     "https://page-one-bucket.s3.us-east-1.amazonaws.com/16093.jpg",
     "https://page-one-bucket.s3.us-east-1.amazonaws.com/17925.jpg",
     "https://page-one-bucket.s3.us-east-1.amazonaws.com/1676.jpg",
     "https://page-one-bucket.s3.us-east-1.amazonaws.com/2149504791.jpg"
    ];

    const randomImage = useMemo(()=>{
      return hotel[Math.floor(Math.random() * hotel.length)];
    },[])

   return randomImage
  }
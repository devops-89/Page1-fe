export default function useRandomHotel() {
    const hotel = [
     "https://img.freepik.com/free-photo/colonial-style-house-night-scene_1150-17925.jpg?t=st=1745585067~exp=1745588667~hmac=e9aa2dfb75ba0dfd609250aa57e3370f21bb31965158f77a1e230660ed39e84e&w=1380",
     "https://img.freepik.com/free-photo/swimming-pool_74190-1977.jpg?t=st=1745584589~exp=1745588189~hmac=8dac6ddebb6e3f4d2d405d55529bd822045c28ee6d0b31f6c012ab3844957c4a&w=1380",
     "https://img.freepik.com/free-photo/popular-resort-amara-dolce-vita-luxury-hotel-with-pools-water-parks-recreational-area-along-sea-coast-turkey-sunset-tekirova-kemer_146671-18759.jpg?t=st=1745585254~exp=1745588854~hmac=8da4b8b02eb015c6305858a56c5f8f0fa9ffb62c9ef3a3f2c09ee12b301a2218&w=1380",
     "https://img.freepik.com/free-photo/light-garden-luxury-pool-nature_1203-4908.jpg?t=st=1745585303~exp=1745588903~hmac=ac27479376731e4d29bd57f8db3d9bf8c451963f369bd47f753f6a1984284525&w=1380",
     "https://img.freepik.com/free-photo/restaurant-hall-with-leather-armchairs-french-windows_140725-8445.jpg?t=st=1745585382~exp=1745588982~hmac=6b64db52d296305897a4b0d3ad7501a79da3b531b30592359ad17080be0091da&w=1380",
     "https://s3.eu-west-2.amazonaws.com/staticgh.gentinghotel.co.uk/uploads/hero/SuiteNov2022_0008_1920.jpg"
    ];
    return hotel[Math.floor(Math.random() * hotel.length)];
  }
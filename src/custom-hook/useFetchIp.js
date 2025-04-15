
import { useEffect } from "react";

const useFetchIP = (setIp) => {
  useEffect(() => {
    const fetchIP = async () => {
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        setIp(data.ip);
      } catch (err) {
        console.error("Failed to fetch IP:", err);
      }
    };

    fetchIP();
  }, []);
};

export default useFetchIP;

import React, { useState } from "react";
import InnerBanner from "@/components/innerBanner";
import forexbg from "@/services/forex/forexbg.jpg";
import { Container, Typography, Box, Grid2, TextField, Button } from "@mui/material";
import { data } from "@/assests/data";
import { roboto } from "@/utils/fonts";
import { COLORS } from "@/utils/colors";
import PaidIcon from "@mui/icons-material/Paid";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import Autocomplete from "@mui/material/Autocomplete";
import { countries } from "@/assests/country";
import axios from "axios";

const Forex = () => {
  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);

  // Function to fetch conversion rate from Forex API
  const fetchConversionRate = async () => {
    if (!fromCurrency || !toCurrency || !amount) return;

    const url = `https://api.apilayer.com/exchangerates_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`;
    const apiKey = "CrMMg143MZaQk9H3NyyCtbwixwtNY78r"; // Your API Key

    try {
      const response = await axios.get(url, {
        headers: {
          "apikey": apiKey,
        },
      });
      setConvertedAmount(response.data.result); // Set the converted amount
    } catch (error) {
      console.error("Error fetching conversion rate:", error);
    }
  };

  return (
    <div>
      <InnerBanner img={forexbg.src} heading={"FOREX"} />
      <Container>
        <Typography variant="h4" sx={{ textAlign: "center", mt: 10, fontFamily: roboto.style }}>
          {data.forexPage.heading}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center", fontFamily: roboto.style }}>
          {data.forexPage.desc}
        </Typography>

        <Box sx={{ bgcolor: COLORS.BLUEOVERLAY, py: 10, my: 2, px: 20 }}>
          <Typography variant="h4" sx={{ textAlign: "center", fontFamily: roboto.style }}>
            Get Started
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center", fontFamily: roboto.style }}>
            With Page1 Travels, start your currency conversion in just a few steps:
          </Typography>

          <Grid2 container spacing={2} sx={{ mt: 2 }}>
            <Grid2 item size={{ lg: 6 }}>
              <Typography sx={{ textAlign: "center", fontFamily: roboto.style }}>
                <PaidIcon sx={{ color: COLORS.PRIMARY, fontSize: 40 }} />
              </Typography>
              <Typography sx={{ textAlign: "center", fontFamily: roboto.style }}>
                Start your currency conversion by selecting currency and entering amount.
              </Typography>
            </Grid2>
            <Grid2 item size={{ lg: 6 }}>
              <Typography sx={{ textAlign: "center", fontFamily: roboto.style }}>
                <CurrencyBitcoinIcon sx={{ color: COLORS.PRIMARY, fontSize: 40 }} />
              </Typography>
              <Typography sx={{ textAlign: "center", fontFamily: roboto.style }}>
                Raise the query or dilemma that you are facing.
              </Typography>
            </Grid2>
          </Grid2>
        </Box>

        <Box sx={{bgcolor:COLORS.PRIMARY,my: 10,px:1}}>
        <Box sx={{ px: 10, py:10,bgcolor:COLORS.BLUEOVERLAY }}>
          <Box sx={{ bgcolor: COLORS.PRIMARY, py: 2 }}>
            <Typography variant="h4" sx={{ color: COLORS.WHITE, textAlign: "center", fontFamily: roboto.style }}>
              Currency Conversion
            </Typography>
          </Box>
          <Grid2 container spacing={2} sx={{ my: 2 }}>
            <Grid2 item size={{ lg: 3 }}>
              <Autocomplete
                size="small"
                id="from-currency"
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.label}
                onChange={(event, newValue) => setFromCurrency(newValue?.code)}
                renderOption={(props, option) => {
                  const { key, ...optionProps } = props;
                  return (
                    <Box key={key} component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...optionProps}>
                      <img loading="lazy" width="20" src={option.image} alt="" />
                      {option.label} ({option.code})
                    </Box>
                  );
                }}
                renderInput={(params) => <TextField {...params} label="From Currency" />}
              />
            </Grid2>
            <Grid2 item size={{ lg: 3 }}>
              <TextField
                size="small"
                fullWidth
                label="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Grid2>
            <Grid2 item size={{ lg: 3 }}>
              <Autocomplete
                size="small"
                id="to-currency"
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.label}
                onChange={(event, newValue) => setToCurrency(newValue?.code)}
                renderOption={(props, option) => {
                  const { key, ...optionProps } = props;
                  return (
                    <Box key={key} component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...optionProps}>
                      <img loading="lazy" width="20" src={option.image} alt="" />
                      {option.label} ({option.code})
                    </Box>
                  );
                }}
                renderInput={(params) => <TextField {...params} label="To Currency" />}
              />
            </Grid2>
            <Grid2 item size={{ lg: 3 }}>
              <TextField
                disabled
                size="small"
                fullWidth
                label="Converted Amount"
                value={convertedAmount || ""}
              />
            </Grid2>
          </Grid2>

          <Box display={"flex"} justifyContent={"center"}>
            <Button
              size="small"
              variant="contained"
              onClick={fetchConversionRate}
              sx={{
                bgcolor: COLORS.PRIMARY,
                color: COLORS.WHITE,
                borderRadius: 0,
                fontFamily: roboto.style,
              }}
            >
              Convert
            </Button>
          </Box>
        </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Forex;

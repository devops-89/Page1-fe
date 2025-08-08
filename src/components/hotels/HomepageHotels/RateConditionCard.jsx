import React, { useState } from "react";
import {
  CardContent,
  Typography,
  List,
  ListItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { COLORS } from "@/utils/colors";
import { nunito, roboto } from "@/utils/fonts";

// Utility to decode HTML entities if needed
const decodeHTMLEntities = (text) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
};

const RateConditionCard = ({ preBookResponse }) => {
  const [open, setOpen] = useState(false);
  const rateConditions =
    preBookResponse?.HotelResult?.[0]?.RateConditions || [];
  const showReadMore = rateConditions.length > 5;

  return (
    <>
      <CardContent>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", fontFamily: roboto?.style }}
        >
          Rate Condition
        </Typography>

        <List>
          {(showReadMore ? rateConditions.slice(0, 5) : rateConditions).map(
            (cond, idx) => (
              <ListItem key={idx} alignItems="flex-start">
                <Typography
                  color="text.primary"
                  sx={{ fontFamily: roboto?.style, fontWeight: 600 }}
                  dangerouslySetInnerHTML={{ __html: decodeHTMLEntities(cond) }}
                />
              </ListItem>
            )
          )}
        </List>

        {showReadMore && (
          <Typography
            onClick={() => setOpen(true)}
            sx={{
              fontFamily: roboto?.style,
              color: COLORS.PRIMARY,
              cursor: "pointer",
              display: "inline-block",
              mt: 1,
              ml:2,
              fontWeight: 500,
            }}
          >
            Read More...
          </Typography>
        )}
      </CardContent>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{bgcolor:COLORS.PRIMARY,color:COLORS.WHITE}}>All Rate Conditions</DialogTitle>
        <DialogContent dividers>
          <List>
            {rateConditions.map((cond, idx) => (
              <ListItem key={idx} alignItems="flex-start">
                <Typography
                  color="text.primary"
                  sx={{ fontFamily: roboto?.style, fontWeight: 600 }}
                  dangerouslySetInnerHTML={{ __html: decodeHTMLEntities(cond) }}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button sx={{color:COLORS.PRIMARY,fontWeight:"bold"}} onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RateConditionCard;

import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Box,
} from "@mui/material";
import { COLORS } from "@/utils/colors";
import { nunito, roboto } from "@/utils/fonts";

// Decode HTML safely
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
      <Card
        sx={{
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          borderRadius: "16px",
          backgroundColor: COLORS.WHITE,
          overflow: "hidden",
          mt: 2,
        }}
      >
        <CardContent sx={{ px: 3, py: 3 }}>
          {/* Header */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontFamily: nunito.style,
              color: COLORS.PRIMARY,
              mb: 1,
              borderBottom: `2px solid ${COLORS.PRIMARY}`,
              display: "inline-block",
              pb: 0.5,
            }}
          >
            Rate Conditions
          </Typography>

          {/* Subtext */}
          <Typography
            variant="body2"
            sx={{
              fontFamily: roboto.style,
              color: COLORS.DARKGREY,
              mb: 2,
            }}
          >
            Please review the following important rate-related policies before
            booking.
          </Typography>

          {/* List of conditions */}
          <List>
            {(showReadMore ? rateConditions.slice(0, 5) : rateConditions).map(
              (cond, idx) => (
                <ListItem
                  key={idx}
                  alignItems="flex-start"
                  sx={{
                    mb: 1.2,
                    borderLeft: `4px solid ${COLORS.LIGHTBLUE}`,
                    backgroundColor: "rgba(245, 247, 255, 0.5)",
                    borderRadius: "8px",
                    px: 2,
                    py: 1.2,
                  }}
                >
                  <Typography
                    color="text.primary"
                    sx={{
                      fontFamily: roboto.style,
                      fontWeight: 500,
                      fontSize: "0.95rem",
                      color: COLORS.SECONDARY,
                      lineHeight: 1.6,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: decodeHTMLEntities(cond),
                    }}
                  />
                </ListItem>
              )
            )}
          </List>

          {/* Read more link */}
          {showReadMore && (
            <Typography
              onClick={() => setOpen(true)}
              sx={{
                fontFamily: roboto.style,
                color: COLORS.PRIMARY,
                cursor: "pointer",
                fontWeight: 600,
                mt: 1,
                ml: 1,
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Read all conditions →
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Dialog - full list */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          sx={{
            bgcolor: COLORS.PRIMARY,
            color: COLORS.WHITE,
            fontFamily: nunito.style,
            fontWeight: "bold",
            py: 1.5,
          }}
        >
          All Rate Conditions
        </DialogTitle>
        <DialogContent dividers sx={{ backgroundColor: "#fafafa" }}>
          <List>
            {rateConditions.map((cond, idx) => (
              <ListItem
                key={idx}
                alignItems="flex-start"
                sx={{
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                  py: 1.2,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: roboto.style,
                    fontWeight: 500,
                    color: COLORS.SECONDARY,
                    lineHeight: 1.6,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: decodeHTMLEntities(cond),
                  }}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "flex-end",
            backgroundColor: "#f4f6f9",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: COLORS.PRIMARY,
              textTransform: "none",
              fontWeight: "bold",
              px: 3,
              "&:hover": { backgroundColor: COLORS.SECONDARY },
            }}
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RateConditionCard;

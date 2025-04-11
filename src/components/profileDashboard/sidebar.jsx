import { data } from "@/assests/data";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import { Edit } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  Divider,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const user = useSelector((state) => state.USER.UserData);
  const router = useRouter();

  return (
    <div>
      <Card sx={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
        <Box sx={{ p: 2 }}>
          <Card
            sx={{
              borderRadius: 10,
              p: 1,
              boxShadow:
                "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            }}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={2}
              justifyContent={"space-between"}
            >
              <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <Avatar
                  sx={{ backgroundColor: !user.avatar && COLORS.PRIMARY }}
                >
                  {user.avatar ? (
                    <Image src={user.avatar} />
                  ) : (
                    <Typography>{user.full_name.slice(0, 1)}</Typography>
                  )}
                </Avatar>
                <Box>
                  <Typography
                    sx={{
                      fontSize: 15,
                      fontFamily: nunito.style,
                      fontWeight: 700,
                    }}
                  >
                    {user?.full_name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontFamily: nunito.style,
                      fontWeight: 500,
                    }}
                  >
                    {user?.email}
                  </Typography>
                </Box>
              </Stack>
              <IconButton
                sx={{
                  backgroundColor: COLORS.LIGHTGREY,
                  ":hover": {
                    backgroundColor: COLORS.LIGHTGREY,
                  },
                }}
              >
                <Edit sx={{ fontSize: 14, color: COLORS.PRIMARY }} />
              </IconButton>
            </Stack>
          </Card>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          {data.sidebarDashboard.map((val, i) => (
            <Box key={i}>
              <Typography
                sx={{
                  color: COLORS.DARKGREY,
                  fontSize: 14,
                  fontFamily: nunito.style,
                  fontWeight: 550,
                  textTransform: "capitalize",
                }}
              >
                {val.heading}
              </Typography>
              <List>
                {val.links.map((item, index) => (
                  <ListItemButton
                    key={index}
                    sx={{
                      ":hover": {
                        backgroundColor: COLORS.PRIMARYOVERLAY,
                      },
                      backgroundColor:
                        router.pathname === item.url && COLORS.PRIMARY,
                      borderRadius: 8,
                      mb: 1,
                    }}
                  >
                    <ListItemAvatar sx={{ minWidth: 30, color: COLORS.BLACK }}>
                      {item.icon}
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontSize: 13,
                            color:
                              router.pathname === item.url
                                ? COLORS.BLACK
                                : COLORS.BLACK,
                            fontFamily: nunito.style,
                          }}
                        >
                          {item.label}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                ))}
              </List>
            </Box>
          ))}
        </Box>
      </Card>
    </div>
  );
};

export default Sidebar;

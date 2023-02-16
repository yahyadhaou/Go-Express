import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import MoneyIcon from "@mui/icons-material/Money";

import axios from "axios";
import { useState, useEffect } from "react";

export const TotalUser = () => {
  // state to save all users
  let [user, setUser] = useState([]);

  // function to get all users
  useEffect(() => {
    axios.get(`http://localhost:5000/admin/getalluser`).then((result) => {
      setUser(result.data);
      console.log(result.data);
    });
  }, []);

  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                Total Users
              </Typography>
              <Typography color="textPrimary" variant="h4">
                {user.length} Users
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: "#ED5C00",
                  height: 56,
                  width: 56,
                }}
              >
                <MoneyIcon />
              </Avatar>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              pt: 2,
            }}
          >
            <ArrowUpwardIcon style={{ color: "#ED5C00" }} />
            <Typography
              // color="error"
              variant="body2"
              sx={{
                mr: 1,
              }}
            >
              {user.length} Users
            </Typography>
            <Typography color="textSecondary" variant="caption">
              Since last month
            </Typography>
          </Box>
        </CardContent>
      </Card>{" "}
    </>
  );
};

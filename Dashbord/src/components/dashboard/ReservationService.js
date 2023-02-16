import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from "@mui/material";
import InsertChartIcon from "@mui/icons-material/InsertChartOutlined";

import axios from "axios";
import { useState, useEffect } from "react";

export const ReservationService = () => {
  // state to save all reservation
  let [reservation, setReservation] = useState([]);

  // function to get all reservation
  useEffect(() => {
    axios.get(`http://localhost:5000/admin/getallreservation`).then((result) => {
      setReservation(result.data);
      console.log(result.data);
    });
  }, []);

  return (
    <Card
      sx={{
        height: 175,
      }}
    >
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Reservation
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {reservation.length} Reservation
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "#ED5C00",
                height: 56,
                width: 56,
                marginBottom: -6,
                marginLeft: -5,
              }}
            >
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        {/* <Box sx={{ pt: 3 }}>
          <LinearProgress value={5.5} variant="determinate" />
        </Box> */}
      </CardContent>
    </Card>
  );
};

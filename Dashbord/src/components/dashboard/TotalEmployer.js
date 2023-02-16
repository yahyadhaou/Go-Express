import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";

import axios from "axios";
import { useState, useEffect } from "react";

export const TotalEmployer = () => {
  // state to save all employer
  let [employer, setEmployer] = useState([]);

  // function to get all employer
  useEffect(() => {
    axios.get(`http://localhost:5000/admin/getEmployers`).then((result) => {
      setEmployer(result.data);
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
                Total Employer
              </Typography>
              <Typography color="textPrimary" variant="h4">
                {employer.length} Employers
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: "#1C2765",
                  height: 56,
                  width: 56,
                }}
              >
                <PeopleIcon />
              </Avatar>
            </Grid>
          </Grid>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              pt: 2,
            }}
          >
            <ArrowUpwardIcon style={{ color: "#1C2765" }} />
            <Typography
              variant="body2"
              sx={{
                mr: 1,
              }}
            >
              {employer.length}Employers
            </Typography>
            <Typography color="textSecondary" variant="caption">
              Since last month
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

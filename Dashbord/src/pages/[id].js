import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { DashboardLayout } from "../components/dashboard-layout";
import {
  CardContent,
  Card,
  Divider,
  CardActions,
  CardHeader,
  TextField,
  Button,
  Box,
  Container,
  Grid,
  Typography,
  Avatar,
} from "@mui/material";

import axios from "axios";

const Page = () => {
  const router = useRouter();
  const [oneuser, setOneuser] = useState([]);

  // function to get one user
  useEffect(() => {
    if (router.isReady) {
      axios
        .get(`http://localhost:5000/admin/getoneuser/${router.query.id}`)
        .then((res) => setOneuser(res.data))
        .catch((err) => console.log(err));
    }
  }, [router.isReady]);

  console.log("pff", oneuser);

  return (
    <>
      <Head>
        <title>One user </title>
      </Head>
      {oneuser.map((element) => (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container
            sx={{
              marginLeft: 40,
            }}
          >
            <Grid container spacing={3}>
              <Grid item lg={8} md={2} xs={20}>
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Avatar
                        src={element.photo}
                        sx={{
                          height: 150,
                          mb: 4,
                          width: 150,
                        }}
                      />

                      <Typography color="textPrimary" gutterBottom variant="h5">
                        {element.name}
                      </Typography>
                    </Box>
                  </CardContent>
                  <Divider />
                </Card>
              </Grid>
              <Grid item lg={8} md={6} xs={12}>
                {/* <AccountProfileDetails /> */}

                <form autoComplete="off" noValidate>
                  <Card>
                    <CardHeader
                      subheader="The information can't be edited"
                      title="User Information"
                    />
                    <Divider
                      sx={{
                        borderColor: "#ED5C00",
                      }}
                    />
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                          <TextField
                            fullWidth
                            helperText="First Name"
                            value={element.name}
                            name="firstName"
                            required
                            variant="outlined"
                            color="warning"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            fullWidth
                            helperText="Email"
                            value={element.email}
                            name="lastName"
                            variant="outlined"
                            color="warning"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            fullWidth
                            helperText="Gender"
                            value={element.gender}
                            name="email"
                            variant="outlined"
                            color="warning"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            fullWidth
                            value={element.phone_number}
                            helperText="Phone Number"
                            name="phone"
                            variant="outlined"
                            color="warning"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            fullWidth
                            value={element.ville}
                            helperText="country"
                            name="Country"
                            variant="outlined"
                            color="warning"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            fullWidth
                            value={element.adress}
                            helperText="Adress"
                            name="state"
                            required
                            variant="outlined"
                            color="warning"
                          ></TextField>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Divider />
                  </Card>
                </form>
              </Grid>
            </Grid>
          </Container>
        </Box>
      ))}
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

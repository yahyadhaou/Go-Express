import Head from "next/head";
import { Box, Container } from "@mui/material";
import { CustomerListResults } from "../components/customer/customer-list-results";
import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";

import axios from "axios";
import { useState, useEffect } from "react";

const Page = () => {
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
      <Head>
        <title>Customers </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar user={user} />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults user={user} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { EmployerListToolbar } from "../components/Employer/Employer-list-toolbar";
import { EmployerListResults } from "../components/Employer/Employer-list-results";

import axios from "axios";
import { useState, useEffect } from "react";

const Page = () => {
  // state to save all employer
  let [employer, setEmployer] = useState([]);

  // function to get all employer
  useEffect(() => {
    axios.get(`http://localhost:5000/admin/GetEmployers`).then((result) => {
      setEmployer(result.data);
      console.log(result.data);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Employers</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <EmployerListToolbar />
          <Box sx={{ mt: 3 }}>
            <EmployerListResults employer={employer} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

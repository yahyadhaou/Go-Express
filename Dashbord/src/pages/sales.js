import Head from "next/head";
import { Box, Container } from "@mui/material";
import { SalesListToolbar } from "../components/sales/sales-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { SalesCard } from "../components/sales/sales-card";

import axios from "axios";
import { useState, useEffect } from "react";

const Page = () => {
  // state to save all products
  let [product, setProduct] = useState([]);

  // function to get all products
  useEffect(() => {
    axios.get(`http://localhost:5000/admin/getallsales`).then((result) => {
      setProduct(result.data);
      console.log(result.data);
    });
  }, []);

  return (
    <>
      <Head>
        <title>sales</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <SalesListToolbar />
          <Box sx={{ pt: 3 }}></Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              pt: 3,
              height: 300,
            }}
          >
            <SalesCard product={product} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

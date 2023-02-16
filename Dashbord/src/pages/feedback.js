import Head from "next/head";
import { DashboardLayout } from "../components/dashboard-layout";
import { FeedBackListToolbar } from "../components/Feedback/FeedBack-list-toolbar";
import { FeedBack } from "../components/Feedback/FeedBack-list";
import { Box, Container } from "@mui/material";

import axios from "axios";
import { useState, useEffect } from "react";

const Page = () => {
  // state to save all feedback
  let [feedback, setFeedback] = useState([]);

  // function to get all feedback
  useEffect(() => {
    axios.get(`http://localhost:5000/admin/getallfeedback`).then((result) => {
      setFeedback(result.data);
      console.log(result.data);
    });
  }, []);

  return (
    <>
      <Head>
        <title>FeedBack</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <FeedBackListToolbar />
          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "center",
              pb: 3,
              width: 500,
            }}
          >
            <FeedBack feedback={feedback} />{" "}
          </Box>
        </Container>
      </Box>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

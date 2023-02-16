import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import { DashboardLayout } from "../../components/dashboard-layout";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import {
  CardContent,
  Card,
  Divider,
  CardActions,
  CardMedia,
  CardHeader,
  TextField,
  Button,
  Box,
  Container,
  Grid,
  Typography,
  Avatar,
} from "@mui/material";

import { useRouter } from "next/router";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  media: {
    width: "100%",
    height: 400,
    width: 400,
    objectFit: "cover",
    borderRadius: 12,
    marginLeft: "30%",
  },
  content: {
    width: "100%",
    margin: theme.spacing(0),
  },
  actions: {
    justifyContent: "center",
  },
  price: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },

  ButtonLeft: {
    color: "#ED5C00",
    marginLeft: "-30%",
  },
  ButtonRight: {
    color: "#ED5C00",
    marginRight: "-50%",
  },

  text: {
    marginLeft: "13%",
  },

  response: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ED5C00",
    borderRadius: 25,
    marginLeft: "35%",
    marginTop: "2%",
    width: "24%",
    color: "white",
  },
}));

function Page() {
  const classes = useStyles();
  const router = useRouter();

  //State to handlle the response of change state, Delete Product , and update price
  const [submitState, setSubmitState] = useState(false);
  const [submitDelete, setSubmitDelete] = useState(false);
  const [submitUpdate, setSubmitUpdate] = useState(false);
  const [submitupdateResponse, setSubmitupdateResponse] = useState(false);

  // state to store oneproduct
  const [oneproduct, setOneproduct] = useState([]);
  const [oneproductPhoto, setOneproductPhoto] = useState([]);
  // state to store the new price
  const [newPrice, setNewPrice] = useState("");

  // function to get one product photo
  useEffect(() => {
    if (router.isReady) {
      axios
        .get(`http://localhost:5000/admin/getoneproduct/photo/${router.query.id}`)
        .then((result) => {
          setOneproductPhoto(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [router.isReady]);

  // function to extract url of images and push them in the array to loop over-it
  let myimages = [];
  let MyPhotoArray = () => {
    oneproductPhoto.map((element) => {
      myimages.push(element.Photo1);
      myimages.push(element.Photo2);
      myimages.push(element.Photo3);
    });
    return myimages;
  };

  MyPhotoArray();

  // function to get one product
  useEffect(() => {
    if (router.isReady) {
      axios
        .get(`http://localhost:5000/admin/getoneproduct/${router.query.id}`)
        .then((res) => {
          setOneproduct(res.data);
          console.log("testtttt", res.data);
        })

        .catch((err) => console.log(err));
    }
  }, [router.isReady]);

  // function to update the state of the product (not_accepted ==> accepted )
  let ChangeState = () => {
    axios
      .put(`http://localhost:5000/admin/updateproductstate/${router.query.id}`, {
        productStatus: "Accepted",
      })
      .catch((err) => console.log(err));
  };

  // function to delete product (not_accepted)
  let DeleteProduct = () => {
    axios
      .delete(`http://localhost:5000/admin/deleteproduct/photo/${router.query.id}`)
      .then(() => {
        axios.delete(`http://localhost:5000/admin/deleteproduct/${router.query.id}`);
      })
      .catch((err) => console.log(err));
  };

  // function to update the price of product
  let ChangePrice = () => {
    axios
      .put(`http://localhost:5000/admin/updateproductprice/${router.query.id}`, {
        price: newPrice,
      })
      .then(window.location.reload(false))
      .catch((err) => console.log(err));
  };

  // function to set time befor change the page
  let TimeToChangePage = () => {
    setTimeout(() => {
      router.push("../products");
    }, "1500");
  };
  // function next
  const handlePrevious = () => {
    if (index === 0) {
      setIndex(myimages.length - 1);
    } else {
      setIndex(index - 1);
    }
  };
  // function next previous
  const handleNext = () => {
    if (index === myimages.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const [index, setIndex] = useState(0);
  return (
    <>
      <Head>
        <title>One Product </title>
      </Head>
      {/* Response of updating Product price */}
      <div>
        {submitupdateResponse ? (
          <div className={classes.response}>
            <strong>Success!</strong> Price Updated.
          </div>
        ) : null}{" "}
      </div>
      {/* Response of accepting Product */}
      <div>
        {submitState ? (
          <div className={classes.response}>
            <strong>Success!</strong> This product is posted on the shop.
          </div>
        ) : null}{" "}
      </div>
      {/* Response of deleting Product */}
      <div>
        {submitDelete ? (
          <div className={classes.response}>
            <strong>Success!</strong> This product is Deleted .
          </div>
        ) : null}{" "}
      </div>
      {oneproduct.map((element) => (
        <Grid item lg={8} md={6} xs={12}>
          {/* <CardHeader subheader="The Price can be edited" title="Product Details" /> */}
          <Divider />
          <Grid>
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
                    <Grid>
                      <SwipeableViews index={index} onChangeIndex={(i) => setIndex(i)}>
                        {myimages.map((element, i) => (
                          <img key={i} className={classes.media} src={element} />
                        ))}
                      </SwipeableViews>
                    </Grid>

                    <Grid>
                      <Button className={classes.ButtonLeft} onClick={handlePrevious}>
                        <NavigateBeforeIcon />
                      </Button>

                      <Button className={classes.ButtonRight} onClick={handleNext}>
                        <NavigateNextIcon />
                      </Button>
                    </Grid>
                  </Box>
                </CardContent>
                <Divider />
              </Card>
            </Grid>
          </Grid>
          <form autoComplete="off" noValidate>
            <Card>
              <CardContent className={classes.text}>
                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Product Name: {element.product_name}
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Price :{element.price} dt {""}
                      <FontAwesomeIcon
                        onClick={() => setSubmitUpdate(!submitUpdate)}
                        icon={faPenToSquare}
                        color="#ED5C00"
                      />
                    </Typography>
                    {/* update Price  Start */}

                    <div>
                      {submitUpdate ? (
                        <Grid item md={6} xs={12}>
                          <TextField
                            onChange={(event) => {
                              setNewPrice(event.target.value);
                            }}
                            helperText="Set The New Price"
                            name="Price"
                            required
                            variant="outlined"
                            color="warning"
                            // ✅
                            InputProps={{
                              endAdornment: (
                                <span
                                  onClick={() => {
                                    ChangePrice();
                                    setSubmitupdateResponse(true);
                                  }}
                                >
                                  ✔️
                                </span>
                              ),
                            }}
                          />
                        </Grid>
                      ) : null}{" "}
                    </div>
                  </Grid>
                  {/* update Price  End */}

                  <Grid item md={6} xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Seller : {element.name}
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Category : {element.category}
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Quantity : {element.quantity} unit
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Description : {element.description}
                      {/* <Typography variant="body1" color="textSecondary" paragraph></Typography> */}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <CardActions className={classes.actions}>
                <Button
                  onClick={() => {
                    ChangeState();
                    setSubmitState(true);
                    TimeToChangePage();
                  }}
                  variant="contained"
                  color="primary"
                  style={{ color: "white", backgroundColor: "#ED5C00" }}
                >
                  Accept Product
                </Button>
                <Button
                  onClick={() => {
                    DeleteProduct();
                    setSubmitDelete(true);
                    TimeToChangePage();
                  }}
                  variant="outlined"
                  color="primary"
                  style={{ color: "#ED5C00", backgroundColor: "white", borderColor: "#ED5C00" }}
                >
                  Reject Product
                </Button>
              </CardActions>
            </Card>
          </form>
        </Grid>
      ))}
    </>
  );
}
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;

import { Avatar, Box, Card, CardContent, Typography, Rating, Item, Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import StarIcon from "@material-ui/icons/Star";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  star: {
    color: "#ED5C00",
  },
}));

export const FeedBack = (props) => {
  let [value, setValue] = useState(0);
  const classes = useStyles();
  return (
    <>
      <Box sx={{ height: 130, width: 1900 }}>
        <Grid container spacing={1}>
          <Grid container item spacing={2}>
            {props.feedback.map((element) => (
              <Card container spacing={3}>
                <Box>
                  <Box>
                    <Avatar
                      sx={{
                        justifyContent: "center",
                        alignContent: "center",
                        height: 120,
                        width: 120,
                        marginLeft: 3,
                        marginTop: 5,
                        borderRadius: 50,
                      }}
                      alt="p=user"
                      // src="https://www.adobe.com/fr/express/create/media_1bb4d071398492506a1b76b3b6f9d69a5e96d7ffc.png?width=750&format=png&optimize=medium"
                      src={{ uri: element.photo }}
                      variant="square"
                    />
                  </Box>
                  <Typography align="center" color="textPrimary" gutterBottom variant="h6">
                    {element.name}
                  </Typography>

                  <Rating
                    name="read-only"
                    value={element.etoile}
                    readOnly
                    icon={<StarIcon className={classes.star} />}
                  />
                  <Typography align="center" color="textPrimary">
                    Detail: {element.details}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import Link from "next/link";

export const CustomerListResults = (props) => {
  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell style={{ color: "#ED5C00" }}>Name</TableCell>
                <TableCell style={{ color: "#ED5C00" }}>Email</TableCell>
                <TableCell style={{ color: "#ED5C00" }}>Phone</TableCell>
                <TableCell style={{ color: "#ED5C00" }}>gender</TableCell>
                <TableCell style={{ color: "#ED5C00" }}>Ville</TableCell>
                <TableCell style={{ color: "#ED5C00" }}>Adress </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.user.map((element) => (
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Avatar src={element.photo} sx={{ mr: 2 }}></Avatar>

                      <Link href={"/id"} as={`/${element.id_user}`}>
                        <Typography color="textPrimary" variant="body1">
                          {element.name}
                        </Typography>
                      </Link>
                    </Box>
                  </TableCell>
                  <TableCell>{element.email}</TableCell>
                  <TableCell>{element.phone_number}</TableCell>
                  <TableCell>{element.gender}</TableCell>
                  <TableCell>{element.ville}</TableCell>
                  <TableCell>{element.adress}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

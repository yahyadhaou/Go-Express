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

export const EmployerListResults = (props) => {
  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox  "></TableCell>

                <TableCell style={{ color: "#ED5C00" }}>First Name</TableCell>
                <TableCell style={{ color: "#ED5C00" }}>Last Name</TableCell>
                <TableCell style={{ color: "#ED5C00" }}>Adress</TableCell>
                <TableCell style={{ color: "#ED5C00" }}>Phone</TableCell>
                <TableCell style={{ color: "#ED5C00" }}>gender</TableCell>
                <TableCell style={{ color: "#ED5C00" }}>Work Position </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.employer.map((element) => (
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
                      <Typography color="textPrimary" variant="body1">
                        {element.first_name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{element.last_name}</TableCell>
                  <TableCell>{element.adress}</TableCell>
                  <TableCell>{element.phone_number}</TableCell>
                  <TableCell>{element.gender}</TableCell>
                  <TableCell>{element.work_position}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

import React from "react";
import { useFormik } from "formik";
import "./Reservation.css";
import Calendar from "../../components/Calendar/Calendar";
import * as Yup from "yup";
import {
  Button,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";

const Reservation = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      tableSize: "",
      dateTime: "",
    },
    onSubmit: (values) => {
      console.log("Submit", values); // logic to save to backend
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
      phoneNumber: Yup.string().required("Phone number is required"),
      tableSize: Yup.number().required("Table size is required"),
      dateTime: Yup.string().required("Date and time are required"),
    }),
  });

  const handleDateTimeChange = (dateTime) => {
    formik.setFieldValue("dateTime", dateTime);
  };

  return (
    <div>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="field">
            <TextField
              label="Name"
              variant="outlined"
              name="name"
              value={formik.values.name || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="error">
              {formik.errors.name && formik.touched.name && formik.errors.name}
            </div>
          </div>
          <div className="field">
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              value={formik.values.email || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <div className="error">
              {formik.errors.email &&
                formik.touched.email &&
                formik.errors.email}
            </div>
          </div>
          <div className="field">
            <TextField
              label="Phone Number"
              variant="outlined"
              name="phoneNumber"
              value={formik.values.phoneNumber || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <div className="error">
              {formik.errors.phoneNumber &&
                formik.touched.phoneNumber &&
                formik.errors.phoneNumber}
            </div>
          </div>
          <div className="field">
            <FormControl fullWidth>
              <InputLabel>Table Size</InputLabel>
              <Select
                name="tableSize"
                value={formik.values.tableSize || ""}
                label="Table Size"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
              </Select>
            </FormControl>
            {/* <TextField
              label="Table Size"
              variant="outlined"
              name="tableSize"
              value={formik.values.tableSize || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            /> */}
            <div className="error">
              {formik.errors.tableSize &&
                formik.touched.tableSize &&
                formik.errors.tableSize}
            </div>
          </div>
          <Calendar
            onDateTimeChange={handleDateTimeChange}
            selectedDateTime={formik.values.dateTime}
          />
          <Button
            style={{
              borderRadius: 35,
              color: "white",
              border: "white",
              backgroundColor: "#e2b7b9",
              padding: "18px 25px",
              fontSize: "18px",
            }}
            variant="outlined"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Reservation;

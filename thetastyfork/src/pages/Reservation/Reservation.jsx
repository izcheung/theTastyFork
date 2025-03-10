import React from "react";
import { useFormik } from "formik";
import "./Reservation.css";
import Calendar from "../../components/Calendar/Calendar";
import * as Yup from "yup";

const Reservation = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
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
            <input
              name="name"
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="error">
              {formik.errors.name && formik.touched.name && formik.errors.name}
            </div>
          </div>
          <div className="field">
            <input
              name="email"
              placeholder="Email"
              value={formik.values.email}
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
            <input
              name="phoneNumber"
              placeholder="Phone Number"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="error">
              {formik.errors.phoneNumber &&
                formik.touched.phoneNumber &&
                formik.errors.phoneNumber}
            </div>
          </div>
          <Calendar
            onDateTimeChange={handleDateTimeChange}
            selectedDateTime={formik.values.dateTime}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Reservation;

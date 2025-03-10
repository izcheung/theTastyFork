import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Input,
} from "@mui/material";
import "./Reviews.css";

const Reviews = () => {
  const formik = useFormik({
    initialValues: {
      reviewTitle: "",
      reviewContent: "",
      foodRating: "",
      serviceRating: "",
      overallExperience: "",
      photo: "",
      name: "",
      email: "",
    },
    onSubmit: (values) => {
      console.log("Submit", values); // logic to save to backend
    },
    validationSchema: Yup.object({
      reviewTitle: Yup.string().required("Review Title is required"),
      foodRating: Yup.number().required(
        "Please leave us a rating on the food quality"
      ),
      serviceRating: Yup.number().required(
        "Please leave us a rating on the service quality"
      ),
      overallExperience: Yup.number().required(
        "Please leave us a rating on the overall experience"
      ),
      photo: Yup.mixed(),
      name: Yup.string(),
      email: Yup.string().email("Invalid email address"),
      reviewContent: Yup.string(),
    }),
  });

  const fileSelectHandler = (event) => {
    console.log(event.target.files[0]);
    formik.setFieldValue("photo", event.target.files[0]);
  };

  return (
    <Container>
      <h1 id="contact-us-title">LEAVE US A REVIEW</h1>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="review-form">
            <div className="review-inputs">
              <div className="field">
                <TextField
                  label="Review title"
                  variant="outlined"
                  name="reviewTitle"
                  fullWidth
                  value={formik.values.reviewTitle || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">
                  {formik.errors.reviewTitle &&
                    formik.touched.reviewTitle &&
                    formik.errors.reviewTitle}
                </div>
              </div>

              <div className="review-questions">
                <div>
                  <FormControl fullWidth>
                    <InputLabel>
                      "How would you rate the quality of the food? (5 is best)
                    </InputLabel>
                    <Select
                      name="foodRating"
                      value={formik.values.foodRating || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Select>
                  </FormControl>
                  <div className="error">
                    {formik.errors.foodRating &&
                      formik.touched.foodRating &&
                      formik.errors.foodRating}
                  </div>
                </div>
                <div>
                  <FormControl fullWidth>
                    <InputLabel>
                      How would you rate the service you received? (5 is best)
                    </InputLabel>
                    <Select
                      name="serviceRating"
                      value={formik.values.serviceRating || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Select>
                  </FormControl>
                  <div className="error">
                    {formik.errors.serviceRating &&
                      formik.touched.serviceRating &&
                      formik.errors.serviceRating}
                  </div>
                </div>
                <div>
                  <FormControl fullWidth>
                    <InputLabel>
                      How was your overall dining experience? (5 is best)
                    </InputLabel>
                    <Select
                      name="overallExperience"
                      value={formik.values.overallExperience || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Select>
                  </FormControl>
                  <div className="error">
                    {formik.errors.overallExperience &&
                      formik.touched.overallExperience &&
                      formik.errors.overallExperience}
                  </div>
                </div>
              </div>

              <Button
                variant="text"
                component="label"
                style={{
                  color: "#e2b7b9",

                  cursor: "pointer",
                }}
              >
                Upload your image
                <input
                  type="file"
                  name="photo"
                  onChange={fileSelectHandler}
                  onBlur={formik.handleBlur}
                  hidden
                />
              </Button>
            </div>
          </div>

          <div className="review-inputs-optional">
            <div className="field">
              <TextField
                label="Name (optional)"
                variant="outlined"
                name="name"
                fullWidth
                value={formik.values.name || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div className="error">
                {formik.errors.name &&
                  formik.touched.name &&
                  formik.errors.name}
              </div>
            </div>
            <div className="field">
              <TextField
                label="Email (optional)"
                variant="outlined"
                name="email"
                fullWidth
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
                label="Anything else you would like us to know? (optional)"
                variant="outlined"
                name="reviewContent"
                multiline
                fullWidth
                rows={4}
                value={formik.values.reviewContent || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div className="error">
                {formik.errors.reviewContent &&
                  formik.touched.reviewContent &&
                  formik.errors.reviewContent}
              </div>
            </div>

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
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Reviews;

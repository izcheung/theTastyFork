import React, { useState, useEffect } from "react";
import { Button, Container } from "@mui/material";
import "./AdminReview.css";

const AdminReview = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch("http://localhost:3000/fetchReviews");
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/review/${reviewId}`,
        {
          method: "DELETE",
        }
      );
      console.log(reviewId);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete review");
      }

      setReviews((prev) =>
        prev.filter((review) => review.reviewId !== reviewId)
      );

      alert("Review deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete review.");
    }
  };

  return (
    <Container>
      <h1 id="review-title">Reviews</h1>
      <div>
        <div className="review-list">
          {reviews.length === 0 ? (
            <p>There are currently no reviews yet.</p>
          ) : (
            reviews.map((review) => (
              <div key={review.reviewId} className="review-card">
                <h3>{review.reviewTitle}</h3>
                <p>{review.reviewContent}</p>
                <p>
                  <strong>Food Rating:</strong> {review.foodRating}
                </p>
                <p>
                  <strong>Service Rating:</strong> {review.serviceRating}
                </p>
                <p>
                  <strong>Overall Experience:</strong>{" "}
                  {review.overallExperience}
                </p>
                {review.photoUrl && (
                  <img src={review.photoUrl} alt="Review Photo" />
                )}
                <Button onClick={() => deleteReview(review.reviewId)}>
                  Delete Review
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </Container>
  );
};

export default AdminReview;

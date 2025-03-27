import React, { useState, useEffect } from "react";
import { Button, Container } from "@mui/material";
import "./AdminReservations.css";

const AdminReservation = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/reservations"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch reservations");
      }
      const formattedData = data.map((reservation) => ({
        ...reservation,
        formattedDateTime: formatDateTime(reservation.dateTime),
      }));
      const data = await response.json();
      setReservations(formattedData);
    } catch (error) {
      console.error("Error fetching reservation messages:", error);
    }
  };

  const formatDateTime = (dateStr) => {
    const dateObj = new Date(dateStr);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC", // Change timezone if needed
    };
    return dateObj.toLocaleString("en-US", options);
  };

  const handleRefresh = () => {
    fetchReservations();
  };

  return (
    <Container>
      <h1 id="reservation-title">Reservation List</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Button
          style={{
            borderRadius: 35,
            color: "white",
            border: "white",
            backgroundColor: "#e2b7b9",
            padding: "12px 20px",
            fontSize: "13px",
          }}
          variant="outlined"
          onClick={handleRefresh}
        >
          Refresh
        </Button>
      </div>
      <div>
        <div className="reservation-list">
          <h2>Messages</h2>
          {reservations.length === 0 ? (
            <p>There are currently no reservations yet.</p>
          ) : (
            reservations.map((reservation) => (
              <div key={reservation.id} className="reservation-card">
                <h3>
                  <strong>Name:</strong> {reservation.name}
                </h3>
                <p>
                  <strong>Email:</strong> {reservation.email}
                </p>
                <p>
                  <strong>Phone number:</strong> {reservation.phoneNumber}
                </p>
                <p>
                  <strong>Reservation time:</strong>{" "}
                  {reservation.formattedDateTime}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </Container>
  );
};

export default AdminReservation;

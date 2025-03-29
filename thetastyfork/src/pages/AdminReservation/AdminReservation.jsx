import React, { useState, useEffect } from "react";
import { Button, Container } from "@mui/material";
import "./AdminReservations.css";

const AdminReservation = () => {
  const [reservations, setReservations] = useState([]);

  const fetchReservations = async () => {
    try {
      const response = await fetch(
        "/api/admin/reservations"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch reservations");
      }
      const data = await response.json();

      const formattedData = data.data.map((reservation) => ({
        ...reservation,
        formattedDate: formatDateTime(reservation.dateTime),
      }));
      setReservations(formattedData);
     
    } catch (error) {
      console.error("Error fetching reservation messages:", error);
    }
  };

  const formatDateTime = (dateStr) => {
    const dateObj = new Date(dateStr);
  
    const month = dateObj.toLocaleString("en-US", { month: "long" });
    const day = dateObj.getUTCDate(); // use getDate() if local time
    const year = dateObj.getUTCFullYear();
  
    let hours = dateObj.getUTCHours(); // use getHours() if local time
    const minutes = dateObj.getUTCMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;
  
    return `${month}. ${day}, ${year} at ${hours}${ampm}`;
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const deleteReservation = async (reservationId) => {
    try {
      const response = await fetch(
        `api/admin/reservations/${reservationId}`,
        {
          method: "DELETE",
        }
      );
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || "Failed to delete reservation");
      }
  
      // Remove from frontend list
      setReservations((prev) =>
        prev.filter((reservation) => reservation.id !== reservationId)
      );
  
      alert("Reservation deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete reservation.");
    }
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
        
      </div>
      <div>
        <div className="reservation-list">

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
                  <strong>Table Size:</strong> {reservation.tableSize}
                </p>
                <p>
                  <strong>Reservation time:</strong>{" "}
                  {reservation.formattedDate}
                </p>
                <Button onClick={() => deleteReservation(reservation.id)}>Delete Reservation</Button>

              </div>
            ))
          )}
        </div>
      </div>
    </Container>
  );
};

export default AdminReservation;

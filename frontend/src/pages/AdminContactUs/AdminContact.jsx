import React, { useState, useEffect } from "react";
import { Button, Container } from "@mui/material";
import "./AdminContact.css";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch("/admin/contact");
      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }
      const data = await response.json();
      const sortedData = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      const formattedData = sortedData.map((message) => ({
        ...message,
        formattedDate: formatDateTime(message.createdAt),
      }));
      console.log(formattedData);
      setContacts(formattedData);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
    }
  };

  const formatDateTime = (dateStr) => {
    const dateObj = new Date(dateStr);

    const month = dateObj.toLocaleString("en-US", { month: "long" });
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    let hours = dateObj.getUTCHours();
    let minutes = dateObj.getUTCMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${month}. ${day}, ${year} at ${hours}:${minutes}${ampm}`;
  };

  return (
    <Container>
      <h1 id="contact-us-title">User Contact Messages</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {/* <Button
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
        </Button> */}
      </div>
      <div>
        <div className="contact-list">
          {contacts.length === 0 ? (
            <p>There are currently no contact messages yet.</p>
          ) : (
            contacts.map((contact) => (
              <div key={contact.id} className="contact-card">
                <h3>{contact.name}</h3>
                <p>{contact.email}</p>
                <p>
                  <strong>User Message:</strong> {contact.message}
                </p>
                <p>
                  <strong>Created At:</strong> {contact.formattedDate}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </Container>
  );
};

export default AdminContacts;

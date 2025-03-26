import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
} from "@mui/material";
import "./AdminContact.css";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch("http://localhost:3000/admin/contact");
      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
    }
  };

  const handleRefresh = () => {
    fetchContacts();
  };

  return (
    <Container>
      <h1 id="contact-us-title">User Contact Messages</h1>
      <div justify-content="center">
        <Button
          variant="contained"
          onClick={handleRefresh}
        >
          Refresh
        </Button>
      </div>
      <div>
        <div className="contact-list">
          <h2>Messages</h2>
          {contacts.length === 0 ? (
            <p>There are currently no contact messages yet.</p>
          ) : (
            contacts.map((contact) => (
              <div key={contact.id} className="contact-card">
                <h3>{contact.name}</h3>
                <p>{contact.email}</p>
                <p><strong>User Message:</strong> {contact.message}</p>
                <p><strong>Created At:</strong> {contact.createdAt}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </Container>
  );
};

export default AdminContacts;

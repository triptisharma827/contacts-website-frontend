// api link -https://ill-tan-snapper-sock.cyclic.app/ 

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [tempContact, setTempContact] = useState({
    name: "",
    contactNumber: "",
  });
  const [editingContact, setEditingContact] = useState(null);
  const [editedContact, setEditedContact] = useState({
    name: "",
    contactNumber: "",
  });
  const [userName, setuserName] = useState("");
  const [showForm, setShowForm] = useState(false);

  function toggleForm() {
    setShowForm(prevState => !prevState);
  }

  async function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  async function populateContacts() {
    const token = localStorage.getItem("token");
    // const token = localStorage.getItem('token');

// Extract the payload from the token
const payloadBase64 = token.split('.')[1];
const payload = JSON.parse(atob(payloadBase64));
const name=payload.name;

    if (token) {
      const req = await fetch("https://ill-tan-snapper-sock.cyclic.app/api/contacts", {
        method: "GET",
        headers: {
          "x-access-token": token,
        },
      });
      const data = await req.json();
      if (data.status === "ok") {
        setuserName(name);
        setContacts(data.contacts);
      } else {
        alert(data.error);
      }
    } else {
      navigate("/login");
    }
  }

  useEffect(() => {
    populateContacts();
  }, []);

  async function addContact(event) {
    event.preventDefault();
    if (tempContact.contactNumber.length !== 10) {
      alert("Contact number must have exactly 10 digits.");
      return;
    }

    const contactData = {
      name: tempContact.name,
      contactNumber: tempContact.contactNumber,
    };

    const req = await fetch("https://ill-tan-snapper-sock.cyclic.app/api/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        contact: contactData,
      }),
    });

    const data = await req.json();
    if (data.status === "ok") {
      setContacts(data.contacts);
      setTempContact({
        name: "",
        contactNumber: "",
      });
    } else {
      alert(data.error);
    }
  }

  async function updateContact(event) {
    event.preventDefault();
    if (editedContact.contactNumber.length !== 10) {
      alert("Contact number must have exactly 10 digits.");
      return;
    }
  
    const contactData = {
      name: editedContact.name,
      contactNumber: editedContact.contactNumber,
    };
  
    const req = await fetch(
      `https://ill-tan-snapper-sock.cyclic.app/api/contacts/${editingContact}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          contact: contactData,
        }),
      }
    );
  
    const data = await req.json();
    if (data.status === "ok") {
      const updatedContacts = contacts.map((contact) => {
        if (contact._id === editingContact) {
          return {
            ...contact,
            name: editedContact.name,
            contactNumber: editedContact.contactNumber,
          };
        }
        return contact;
      });
      setContacts(updatedContacts);
      setEditingContact(null);
      setEditedContact({
        name: "",
        contactNumber: "",
      });
    } else {
      alert(data.error);
    }
  }  

  async function deleteContact(contactId) {
    const req = await fetch(`https://ill-tan-snapper-sock.cyclic.app/api/contacts/${contactId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const data = await req.json();
    if (data.status === "ok") {
      setContacts(data.contacts);
    } else {
      alert(data.error);
    }
  }

  function editContact(contactId) {
    const contact = contacts.find((contact) => contact._id === contactId);
    setEditingContact(contactId);
    setEditedContact({
      name: contact.name,
      contactNumber: contact.contactNumber,
    });
  }

  return (
    <div className="app">
    <div className="main-screen">
    <div className="header">
      <h1>Hello {userName} !!</h1>
      <div className="logout" onClick={logout}><img src="./resources/logout.png" width={'30px'}></img></div>
    
    </div>
    <div className="header2">
    <h2>Here's Your Contacts List</h2>
      <div className="open-form-button" onClick={toggleForm}>
          <img src="./resources/addition.png" width={'30px'}/>
      </div>
    </div>
    {showForm && (
          <div className="popup-form">
            <form onSubmit={addContact}>
            <input
          type="text"
          placeholder="Name"
          value={tempContact.name}
          onChange={(e) =>
            setTempContact({ ...tempContact, name: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Contact Number"
          value={tempContact.contactNumber}
          onChange={(e) =>
            setTempContact({ ...tempContact, contactNumber: e.target.value })
          }
          required
        />
              <button type="submit" value="Add Contact"  className="btn">Add Contact</button>
            </form>
            
          </div>
        )}
      {contacts.length > 0 ? (
        <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td >
                  {editingContact === contact._id ? (

                    <input
                    className="updationinput"
                      type="text"
                      value={editedContact.name}
                      onChange={(e) =>
                        setEditedContact({
                          ...editedContact,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    contact.name
                  )}
                </td>
                <td >
                  {editingContact === contact._id ? (
                    <input 
                    className="updationinput"
                      type="number"
                      value={editedContact.contactNumber}
                      onChange={(e) =>
                        setEditedContact({
                          ...editedContact,
                          contactNumber: e.target.value,
                        })
                      }
                    />
                  ) : (
                    contact.contactNumber
                  )}
                </td>
                <td>
                  {editingContact === contact._id ? (
                    <div className="btn-container">
                      <button className="updationbtn" onClick={updateContact}>Update</button>
                      <button
                      className="updationbtn"
                        onClick={() => {
                          setEditingContact(null);
                          setEditedContact({
                            name: "",
                            contactNumber: "",
                          });
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div  className="icons">
                      
                      <div className="icon" onClick={() => editContact(contact._id)}>
                        <img src="./resources/edit.gif" alt="Edit" width={'20px'}  />
                      </div>
                      <div className="icon" onClick={() => deleteContact(contact._id)}>
                        <img src="./resources/trash.gif" alt="Delete" width={'20px'} />
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      ) : (
        <p className="nocontact">No contacts found.</p>
      )}
      
      
      </div>
    </div>
  );
}
import React from "react"

const ContactList = ({ contacts }) => {

    const onDelete = async (contactId) => {
        const url = `http://127.0.0.1:5000/delete_contact/${contactId}`;
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        };
        try {
            const response = await fetch(url, options);
            if (response.status !== 200) {
                const data = await response.json();
                alert(data.message);
            } else {
                alert('Contact deleted successfully');
                window.location.reload(); // Reloading the page to reflect the changes
            }
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    return (
        <div>
            <h2>Contacts</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => (
                        <tr key={contact.id}>
                            <td>{contact.firstName}</td>
                            <td>{contact.lastName}</td>
                            <td>{contact.email}</td>
                            <td>
                                <button>Update</button>
                                <button onClick={() => onDelete(contact.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ContactList
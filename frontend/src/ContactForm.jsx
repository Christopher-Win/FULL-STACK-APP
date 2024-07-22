import {useState} from "react"

const ContactForm = ({ addContact }) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")

    const onSubmit = async (e) => { //
        e.preventDefault() // Prevent the page from refreshing

        const data = {
            firstName,
            lastName,
            email
        }
        const url = "http://127.0.0.1:5000/create_contact"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(url, options)

        if (response.status != 201 && response.status != 200) {
            const data = await response.json()
            alert(data.message)
        }
        else{
            alert('Contact created successfully');
            window.location.reload(); // Reloading the page to reflect the changes
        }
    }

    return ( // returns the form to create a new contact
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="firstName">First Name</label> 
                <input
                    type="text" 
                    value={firstName}
                    id ="firstName"
                    onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label> 
                <input
                    type="text" 
                    value={lastName}
                    id ="lastName"
                    onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="email">Email</label> 
                <input
                    type="email" 
                    value={email}
                    id ="email"
                    onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button type="submit">Create Contact</button>
        </form> 
    );
};

export default ContactForm
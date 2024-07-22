import { useState, useEffect } from 'react'
import './App.css'
import ContactList from './ContactList'
import ContactForm from './ContactForm'

function App() {
    const [contacts, setContacts] = useState([]) // This will store the contacts list from the API response with the help of useState hook

    useEffect(() => {
        fetchContacts() // Calling the fetchContacts function when the component is mounted
    }, [])

    const fetchContacts = async () => {
        const response = await fetch('http://127.0.0.1:5000/contacts') // Fetching the contacts list from the API
        const data = await response.json() // Extracting the JSON data from the response object
        setContacts(data.contacts) // Updating the contacts list with the extracted data
        console.log(data.contacts) // Logging the contacts list to the console when the data is fetched
    }

    return(
        <> 
            <ContactList contacts={contacts}/>
            <ContactForm/>
        </>
    ); // Rendering the ContactList with the contacts list as a prop and the ContactForm component
}

export default App

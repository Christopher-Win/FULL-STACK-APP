from flask import request, jsonify
from config import app, db
from models import Contact

@app.route('/contacts', methods=['GET'])
def get_contacts():
    """
    This function handles the GET request to retrieve all contacts.
    """
    
    # Code to retrieve contacts from the database
    contacts = Contact.query.all() # sets contacts to a list of all contacts in the database.
    json_contacts = [contact.to_json() for contact in contacts] # List of contacts in JSON format.
    return jsonify({"contacts": json_contacts}) # Returns the list of contacts in JSON format.  

@app.route('/create_contact', methods=['POST'])
def create_contact():
    """
    This function handles the POST request to create a new contact.
    """
    # Code to create a new contact
    first_name = request.json.get('firstName') # Gets the first name from the request.
    last_name = request.json.get('lastName')
    email = request.json.get('email')
    
    # Checks if all fields are provided.
    if not first_name or not last_name or not email: 
        return (jsonify({"errorMessage": "Please provide all fields"}), 400,)
    
    new_contact = Contact(first_name=first_name, last_name=last_name, email=email) # Creates a new contact.
    try:
        db.session.add(new_contact) # Adds the new contact to the database session.
        db.session.commit() # Commits the new contact to the database permanently.
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "Contact created successfully!"}), 201 

@app.route('/update_contact/<int:user_id>', methods=['PATCH']) # This route will be used to update a contact.
def update_contact(user_id):
    contact = Contact.query.get(user_id) # Retrieves the contact with the specified ID.
    
    if not contact: # Checks if the contact exists.
        return jsonify({"message": "User not found!"}), 404
    
    data = request.json # Gets the data from the request.
    contact.first_name = data.get('firstName', contact.first_name) # Updates the first name if provided.
    contact.last_name = data.get('lastName', contact.last_name) # Updates the last name if provided.
    contact.email = data.get('email', contact.email) # Updates the email if provided.

    db.session.commit()
    return jsonify({"message": "User updated successfully!"}), 200

@app.route('/delete_contact/<int:user_id>', methods=['DELETE']) # This route will be used to delete a contact.
def delete_contact(user_id):
    contact = Contact.query.get(user_id)
    
    if not contact: # Checks if the contact exists.
        return jsonify({"message": "User not found!"}), 404
    
    db.session.delete(contact)
    db.session.commit()
    
    return jsonify({"message": "User deleted successfully!"}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        
    app.run(debug=True)
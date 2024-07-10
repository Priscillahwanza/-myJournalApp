# Project Name

This project consists of a backend service built with Node.js and Express, and a mobile application built with React Native. The backend service provides authentication and journal entry management functionalities, while the mobile app interacts with these services.

## Setup Instructions

1. **Clone the repository:**

   git clone https://github.com/Priscillahwanza/-myJournalApp.git
   cd your-repo
   Install dependencies:

Ensure you have Node.js and npm installed. Then run:

npm install
Set up environment variables:

Create a .env file in the root directory and add the following variables:

env
PORT=3000
JWT_SECRET=your_jwt_secret
DB_CONNECTION_STRING=your_database_connection_string
Run database migrations (if applicable):

If you're using a migration tool, run the necessary commands to set up your database schema.

Start the backend service:

npm start
The backend service will be running on http://localhost:3000.

Mobile App
Build and Run Instructions
Navigate to the mobile app directory:

cd frontend
Install dependencies:

Ensure you have Node.js and npm installed. Then run:

npm install
Set up environment variables:

Create a .env file in the mobile app directory and add the following variables:

env

API_BASE_URL=http://localhost:3000
Run the mobile app:

For iOS:

npm run ios
For Android:

npm run android
Ensure you have the necessary environment set up for React Native development.

API Documentation
Authentication Endpoints
Register
URL: /auth/register
Method: POST
Description: Registers a new user.
Request Body:
json
{
"username": "string",
"password": "string"
}
Response:
json
{
"message": "User registered successfully",
"user": {
"id": "string",
"username": "string"
}
}
Login
URL: /auth/login
Method: POST
Description: Logs in a user.
Request Body:
json
{
"username": "string",
"password": "string"
}
Response:
json
{
"token": "string"
}
Get Profile
URL: /auth/profile
Method: GET
Description: Retrieves the authenticated user's profile.
Headers:
json
{
"Authorization": "Bearer <token>"
}
Response:
json
{
"id": "string",
"username": "string"
}
Update Profile
URL: /auth/profile
Method: PUT
Description: Updates the authenticated user's profile.
Headers:
json
{
"Authorization": "Bearer <token>"
}
Request Body:
json
{
"username": "string"
}
Response:
json
{
"message": "Profile updated successfully",
"user": {
"id": "string",
"username": "string"
}
}
Journal Entry Endpoints
Create Journal Entry
URL: /journalEntries
Method: POST
Description: Creates a new journal entry.
Headers:
json
{
"Authorization": "Bearer <token>"
}
Request Body:
json
{
"title": "string",
"content": "string"
}
Response:
json
{
"message": "Journal entry created successfully",
"entry": {
"id": "string",
"title": "string",
"content": "string",
"createdAt": "string"
}
}
Get Journal Entries
URL: /journalEntries
Method: GET
Description: Retrieves all journal entries for the authenticated user.
Headers:
json
{
"Authorization": "Bearer <token>"
}
Response:
json
[
{
"id": "string",
"title": "string",
"content": "string",
"createdAt": "string"
}
]
Contributing
Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests to us.

License
This project is licensed under the MIT License - see the LICENSE.md file for details.

Make sure to adjust paths, URLs, and other details according to your actual project setup.

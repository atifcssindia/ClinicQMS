# VitalX - Clinic Queue Management System

VitalX is a simple queue management system designed for small clinics to streamline their patient handling processes.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You'll need the following installed on your system:

- Node.js
- npm (comes with Node.js)
- PostgreSQL

### Installation

Follow these steps to get your development environment running:

1. Clone the repository:

```bash
git clone https://github.com/yashitgarg/VitalX.git


2.  Install dependencies and start server
cd VitalX
cd server
npm install
npm start

The server should now be running on http://localhost:5001.

3. Open a new terminal tab/window and navigate to the client directory:
cd client
npm install
npm start
The client should now be running on http://localhost:3000.


Setting Up the Database
Ensure you have PostgreSQL running and create a database named data. You will also need to set up the required tables.
Create a .env file in the server directory and add the following variables:

DB_USER=yourPostgresUsername
DB_PASS=yourPostgresPassword
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=data
[Replace the values with your actual PostgreSQL credentials.]

Contributing
To contribute to VitalX, follow these steps:

Fork the repository.
Create a branch: git checkout -b <branch_name>.
Make your changes and commit them: git commit -m '<commit_message>'
Push to the original branch: git push origin <project_name>/<location>
Create the pull request.




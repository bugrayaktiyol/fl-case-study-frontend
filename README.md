# User Management System

User Management System is a web application that allows you to manage users. 


## Features

- List users with details such as GormID, Name, Age, Address, and Tags.
- Perform bulk deletion of selected users.
- Edit existing user information.
- Add new users to the system.
- Dynamic routing to individual user profiles.

## Technologies Used

- **Frontend Framework:** React(Typescript) with Next.js
- **UI Libraries:** Ant Design / Pro Ant Design
- **Data Generation:** [Mockaroo](https://www.mockaroo.com/) for dummy data
- **Testing:** Jest for unit testing

## Getting Started

1. Install dependencies:

   ```properties
   npm install
   ```

2. Run the project

   ```properties
   npm run dev
   ```

   The application will be available at http://localhost:3000

## Usage

- Visit the Users page to view and manage users (http://localhost:3000/users)
- Perform actions such as edit, delete, and add users through the user interface.

## Testing

The application includes unit tests using Jest. To run the tests, use the following command:

   ```properties
   npm test
   ```

The test suite covers functions like **rendering** form component, **fetchDataFromApi**, **fetchSingleUser**, and **addNewUser**.

These tests ensure that data is fetched and processed correctly, and error handling is in place.
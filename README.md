**Expense Tracker**
A full-stack Expense Tracker web application built using **React, Node.js, Express.js, Prisma ORM, and MySQL**.
The application allows users to securely manage their income and expenses. 
Authenticated users can create and manage transactions and categories, filter transactions, and view their financial summary through a dashboard.

# Project Overview
## Main Features
  * User registration and login
  * JWT-based authentication
  * Secure password hashing using bcrypt
  * Protected frontend and backend routes
  * Create, view, update, and delete categories
  * Create and manage income and expense transactions
  * Filter transactions by:
    i. Type
    ii. Category
    iii. Date range
  * Search transactions
  * Dashboard with:
    i. Total income
    ii. Total expenses
    iii. Current balance
    iv. Recent transactions
  * MySQL database persistence using Prisma ORM
  * Input validation and error handling

## Technology Stack
  ### Frontend
    * React
    * Vite
    * React Router DOM
    * JavaScript
    * CSS
  ### Backend
    * Node.js
    * Express.js
    * JWT
    * bcryptjs
    * express-validator
  ### Database
    * MySQL
    * Prisma ORM
---------------------------------------------------------------------------------------------
# Prerequisites
Before installing the project, make sure the following are installed on your system:
* Node.js (LTS recommended)
* npm (comes with Node.js)
* MySQL
* Git
* phpMyAdmin or MySQL Workbench (optional, for database management)
----------------------------------------------------------------------------------------------
# Installation Steps

## 1. Clone the Repository
* Clone the project from GitHub:
 git clone https://github.com/fatema2061/Expense_Tracker_Fatema_Roshed_Mim.git
* Navigate to the project directory:
cd Expense_Tracker_Fatema_Roshed_Mim
## 2. Install Backend Dependencies
* Navigate to the backend folder:
cd backend
* Install the required packages:
npm install
## 3. Create the MySQL Database
* Create a MySQL database named:
**expense_tracker**.
* You can create the database using phpMyAdmin, MySQL Workbench, or the MySQL command line.
## 4. Configure Environment Variables
Inside the backend directory, create a .env file:
* DATABASE_URL="mysql://USERNAME:PASSWORD@localhost:3306/* expense_tracker"
* JWT_SECRET="your_secure_jwt_secret"
* PORT=5000.
* Replace 'USERNAME' and 'PASSWORD' with your local MySQL credentials.
## 5. Run Prisma Migration
* Run the Prisma migration:
npx prisma migrate dev
* Generate the Prisma Client:
npx prisma generate
## 6. Install Frontend Dependencies
* Open a new terminal and go to the frontend directory:
cd frontend
* Install the frontend dependencies:
npm install
* The project is now ready to run.

-------------------------------------------------------------------------------------------------- 
# How to Run
The frontend and backend should be run separately.
## Run the Backend
* Open a terminal:
 **cd backend**,then
 **npm run dev**
* The backend server will normally run at:
http://localhost:5000
## Run the Frontend
* Open another terminal:
**cd frontend**,then
**npm run dev**
* The frontend will normally run at:
http://localhost:5173
* Open the frontend URL in your browser:
http://localhost:5173

---------------------------------------------------------------------------------------------------
# Default Environment Variables
The backend uses the following environment variables:

| Variable     | Default / Example                                        | Description                            |
| ------------ | -------------------------------------------------------- | -------------------------------------- |
| DATABASE_URL | mysql://USERNAME:PASSWORD@localhost:3306/expense_tracker | MySQL database connection              |
| JWT_SECRET   | your_secure_jwt_secret                                   | Secret key used for JWT authentication |
| PORT         | 5000                                                     | Backend server port                    |

**Note:** The values shown above are examples/defaults. Configure them according to your local environment.

------------------------------------------------------------------------------------------------------

# Database Schema

The application uses **MySQL** as the relational database and **Prisma ORM** for database management.

The database consists of three main entities:

* **User**
* **Category**
* **Transaction**

### Entity Relationship


| Entity | Relationship |
|---|---|
| User | Has many Categories |
| User | Has many Transactions |
| Category | Has many Transactions |
| Transaction | Belongs to one User |
| Transaction | Belongs to one Category |

### User

| Field       | Type     | Description           |
| ----------- | -------- | --------------------- |
| `id`        | Int      | Primary key           |
| `fullName`  | String   | User's full name      |
| `email`     | String   | Unique user email     |
| `password`  | String   | Hashed password       |
| `createdAt` | DateTime | Account creation date |
| `updatedAt` | DateTime | Last update date      |

### Category

| Field       | Type     | Description                  |
| ----------- | -------- | ---------------------------- |
| `id`        | Int      | Primary key                  |
| `name`      | String   | Category name                |
| `type`      | Enum     | `INCOME` or `EXPENSE`        |
| `userId`    | Int      | Foreign key referencing User |
| `createdAt` | DateTime | Category creation date       |
| `updatedAt` | DateTime | Last update date             |

### Transaction

| Field             | Type     | Description                      |
| ----------------- | -------- | -------------------------------- |
| `id`              | Int      | Primary key                      |
| `title`           | String   | Transaction title                |
| `amount`          | Decimal  | Transaction amount               |
| `type`            | Enum     | `INCOME` or `EXPENSE`            |
| `categoryId`      | Int      | Foreign key referencing Category |
| `userId`          | Int      | Foreign key referencing User     |
| `transactionDate` | DateTime | Date of the transaction          |
| `createdAt`       | DateTime | Transaction creation date        |
| `updatedAt`       | DateTime | Last update date                 |

### Relationships

* One **User** can have many **Categories**.
* One **User** can have many **Transactions**.
* One **Category** can be associated with many **Transactions**.
* Each **Transaction** belongs to one **User** and one **Category**.
* Categories and transactions are isolated per authenticated user.



Author
Fatema Roshed Mim
B.Sc. in Information and Communication Technology (ICT)
Institute of Information Technology (IIT), Jahangirnagar University

# Finance Backend System

## Overview

This backend system is built to manage financial records with clear role-based access control. It provides a structured way to handle transactions, user roles, and summary-level insights required for a finance dashboard.

The focus of this implementation is not just CRUD operations, but designing a system that is logically organized, secure, and easy to extend.

---

## Problem Understanding

The goal was to design a backend that can:

- Store and manage financial data
- Support multiple user roles with different permissions
- Provide summary-level insights for dashboards
- Ensure proper access control and data integrity

Instead of treating this as a simple API task, the system is designed to reflect how a real backend would handle structured financial data.

---

## System Design

The application follows a modular structure with clear separation of concerns:

- **Controllers** handle business logic
- **Routes** define API endpoints
- **Models** define data structure
- **Middleware** manages authentication and role-based access

### Data Flow

Client → Route → Middleware → Controller → Database → Response

This ensures that authentication, authorization, and validation are handled before business logic execution.

---

## Features

- User registration and authentication (JWT-based)
- Role-based access control (Admin, Analyst, Viewer)
- Financial transaction management
- Filtering transactions by type, category, and date
- Dashboard summary with aggregated financial data
- Soft delete functionality for safe data handling
---

## Live Deployment & Demo

The backend is fully operational and deployed on the cloud. You can test the live API endpoints using the link below:

- **Live API URL:** https://finance-backend-engine.onrender.com/
- **API Health Check:** https://finance-backend-engine.onrender.com/health
---

## Role-Based Access Control

| Role    | Permissions                                  |
| ------- | -------------------------------------------- |
| Admin   | Full access (create, read, delete, manage)   |
| Analyst | Create and read transactions, view summary   |
| Viewer  | Read-only access to transactions and summary |

Access control is enforced using middleware, ensuring restricted actions are blocked at the backend level.

---

## API Overview

### Auth

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`

### Transactions

- `POST /api/v1/transactions`
- `GET /api/v1/transactions`
- `DELETE /api/v1/transactions/:id`

### Summary

- `GET /api/v1/summary`

---

## Key Decisions

- **MongoDB** was used for flexible schema handling and ease of storing financial records
- **JWT authentication** ensures stateless and scalable user sessions
- **Role-based middleware** is used to enforce access control at the API level
- **Aggregation pipeline** is used to calculate summary data efficiently
- **Soft delete** is implemented to prevent permanent data loss

These decisions were made to keep the system scalable, maintainable, and aligned with real-world backend practices.

---

## Validation and Error Handling

- Input validation is applied before database operations
- Proper HTTP status codes are used
- Clean and consistent error responses are returned

This ensures reliability and predictable system behavior.

---

## Setup Instructions

1. Clone the repository
2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file and add:

   ```
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

4. Run the server:

   ```
   npm run dev
   ```

---

## Assumptions

- Each user manages their own financial records
- Roles are predefined as Admin, Analyst, and Viewer
- Soft delete is preferred over hard delete
- Authentication is handled using JWT

---

## Future Improvements

- Pagination for large datasets
- Category-wise analytics and trends
- Rate limiting and security enhancements
- API documentation (Swagger)
- Unit and integration testing

---

## Conclusion

This project focuses on backend design clarity, role-based access control, and efficient data handling rather than just implementing endpoints.

The system is structured to reflect real-world backend development practices and can be extended into a full-scale financial application.


---

## Contact & Portfolio

I am a **Full Stack Developer** passionate about building scalable, user-centric applications and solving complex backend challenges.

- **Name:** Sarthak Gaikwad  
- **Email:** [sarthakgaikwad020@gmail.com](mailto:sarthakgaikwad020@gmail.com)  
- **GitHub:** [devsarthak-1503](https://github.com/devsarthak-1503)

Made with ❤️ by **Sarthak Gaikwad**

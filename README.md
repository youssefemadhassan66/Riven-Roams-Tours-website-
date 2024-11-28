Riven Roams - Tour Website
Overview

Riven Roams is a secure and dynamic web platform designed to streamline the tour booking experience. It offers features for both regular users and administrators, making it a comprehensive solution for managing and exploring tours.
Features
User Features

    Browse Tours: Users can explore a variety of tours with detailed descriptions and options.
    User Authentication:
        Secure sign-up and login functionality using token-based authentication.
        Session management using JWT tokens securely stored in local storage.
    Tour Booking: Users can book tours and manage their bookings effortlessly.

Admin Features

    Dashboard:
        Full CRUD operations for managing tours (create, view, edit, delete).
        Full CRUD operations for managing users.
    Secure Routes:
        Role-based access control for admin-specific actions.
        Protected admin dashboard and API endpoints using JWT authentication.

Static Pages

    About Page: Information about the platform and its purpose.
    Contact Page: Contact details and form for user inquiries.

Security Highlights

    Token-Based Authentication: Ensures secure user sessions.
    Protected API Endpoints: Admin and user routes are secured with middleware for token verification.
    Local Storage: Safely stores JWT tokens for maintaining user sessions.

Technology Stack

    Front-End:
        HTML, CSS, JavaScript
        Framework: Angular
        Responsive design using Bootstrap

    Back-End:
        Node.js with Express.js for RESTful APIs
        MongoDB for database management

    Authentication:
        jsonwebtoken for secure token generation and validation
        bcryptjs for password hashing

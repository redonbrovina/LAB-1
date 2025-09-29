# LAB-1





### Setup and Installation



To start up the application you need to first install Node (https://nodejs.org/en/download/)



The database is connected locally using XAMPP.

Start Apache and MYSQL from the XAMPP Control Panel.



After starting both up you will find in the /current\_database folder the database file (shneta.sql). You must import this database in phpMyAdmin in order for the database connection to be successful and the application to run.


For any changes made to the database, you must export and replace the current version of the database in the /current\_database folder.





------------------------------------------------------------------------------------------------------



### App Startup



To start up the application you must first install dependencies. Do this with the command:



npm install



To start up the actual application you use:



npm run dev





This command runs the server and the client concurrently. You can find details on how this works in the package.json file in the main directory under 'scripts'.



---

<br>

### 

### User Guide

This application is a comprehensive pharmaceutical distribution platform with role-based access control. The system supports three main user types: **Public Users**, **Clients (Klient)**, and **Administrators**.

#### User Roles and Access Levels

**1. Public Users (Unauthenticated)**
- Can view public pages: Home, About, Services
- Can access login and signup pages
- Cannot access protected client or admin features

**2. Clients (Klient)**
- Full access to client dashboard and features
- Can browse and purchase products
- Manage shopping cart and orders
- View payment history and manage payment methods
- Update profile information

**3. Administrators (Admin)**
- Complete system administration access
- Manage all users, products, suppliers, and orders
- Access to analytics and reporting
- System configuration and settings management

<br>

#### Getting Started
---
**For New Users:**
1. Navigate to the signup page (`/signup`)
2. Fill in your company information and contact details
3. Create your account credentials
4. After successful registration, you'll be redirected to the signup success page
5. An admin will review your application and you will be informed by email if you have been accepted or rejected.
6. If accepted: Use your credentials to log in at `/login`

**For Existing Clients:**
1. Go to the login page (`/login`)
2. Enter your email and password
3. Upon successful login, you'll be redirected to your dashboard

**For Administrators:**
1. Use the admin login page (`/admin-login`)
2. Enter your admin credentials
3. Access the admin dashboard with full system controls

<br>

#### Client Features
---
**Dashboard (`/dashboard`)**
- Overview of your account activity
- Quick access to recent orders and payments
- Account summary and statistics

**Products (`/products`)**
- Browse available products with filtering and search
- View product details, pricing, and availability
- Add products to your shopping cart

**Shopping Cart (`/cart`)**
- Review selected products before checkout
- Modify quantities or remove items
- Proceed to order creation
- Will be notified by email when you create an order

**Orders (`/orders`)**
- View all your past and current orders
- Track order status and delivery information
- Access order details and invoices

**Payments (`/payments`)**
- View payment history and transaction details
- Monitor payment status for orders
- Access payment receipts and documentation

**Payment Methods (`/payment-methods`)**
- Manage your saved payment methods
- Add new payment options
- Update billing information

**Profile (`/profile`)**
- Update your personal and company information
- Change password and security settings
- Manage account preferences

<br>

#### Admin Features
---
**Admin Dashboard (`/admin`)**
- System overview and key metrics
- Recent activity and alerts
- Quick access to all administrative functions

**User Management (`/admin/users`)**
- View and manage all client accounts
- Create new client accounts
- Edit user information and permissions
- Monitor user activity

**Product Management (`/admin/products`)**
- Add, edit, and remove products
- Manage product categories and suppliers
- Update inventory and pricing
- Handle product images and descriptions

**Order Management (`/admin/orders`)**
- View all orders across the system
- Update order status and tracking

**Payment Management (`/admin/payments`)**
- Monitor all payment transactions
- Handle payment disputes and issues
- Configure payment methods and settings
- Generate payment reports

**Supplier Management (`/admin/suppliers`)**
- Manage supplier information and contacts
- Remove suppliers you no longer work with

**Applications (`/admin/applications`)**
- Review and process client applications
- Manage application status and workflow
- Handle approval and rejection processes

**Reference Data (`/admin/reference-data`)**
- Manage system reference data
- Configure categories, statuses, and other lookup values
- Maintain data consistency across the system

**Settings (`/admin/settings`)**
- Configure system-wide settings
- Edit your current information
- Add a new administrator
- Set up system preferences and defaults

<br>

#### Navigation and User Interface
---
**Client Navigation:**
- Use the top navigation bar to access different sections
- The navigation adapts based on your current page
- Quick access buttons for common actions

**Admin Navigation:**
- Comprehensive admin sidebar with all administrative functions
- Breadcrumb navigation for complex workflows
- Quick action buttons for common administrative tasks

**Responsive Design:**
- The application is fully responsive and works on desktop, tablet, and mobile devices
- Touch-friendly interface for mobile users
- Optimized layouts for different screen sizes

#### Security and Authentication

**Password Requirements:**
- Minimum 8 characters
- Must contain uppercase and lowercase letters
- Must include numbers and special characters

**Session Management:**
- Automatic session timeout for security
- Secure token-based authentication
- Logout functionality to end sessions

**Data Protection:**
- All sensitive data is encrypted
- Secure communication protocols
- Regular security updates and patches


<br>

### API Documentation

---

The application provides a RESTful API for all system operations. The API is built with Express.js and uses JWT (JSON Web Tokens) for authentication.

#### Base URL
```
http://localhost:5000/api
```

#### Authentication

Most API endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```
#### Token Storage

Access and Refresh Tokens are stored as HttpOnly Cookies for security reasons.


#### Response Format

All API responses follow a consistent format:

**Success Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

#### API Endpoints

##### Authentication & User Management

---

**POST** `/api/form/refresh-token`
- Refresh JWT access token
- **Body:** `{ "refreshToken": "string" }`
- **Response:** New access token

**POST** `/api/form/logout`
- Logout user and invalidate tokens
- **Body:** `{ "refreshToken": "string" }`

**GET** `/api/form/user-info`
- Get current user information
- **Headers:** `Authorization: Bearer <token>`
- **Response:** User profile data

**GET** `/api/form/shtetet`
- Get list of all countries
- **Response:** Array of country objects

##### Client Management

---

**POST** `/api/klienti/login`
- Client login
- **Body:** `{ "email": "string", "password": "string" }`
- **Response:** User data and tokens

**GET** `/api/klienti/`
- Get all clients (admin only)
- **Headers:** `Authorization: Bearer <token>`
- **Query:** `?page=1&limit=10&search=term`

**GET** `/api/klienti/paginated`
- Get paginated clients list
- **Headers:** `Authorization: Bearer <token>`
- **Query:** `?page=1&limit=10`

**GET** `/api/klienti/search`
- Search clients
- **Headers:** `Authorization: Bearer <token>`
- **Query:** `?q=search_term`

**GET** `/api/klienti/:klientiID`
- Get client by ID
- **Headers:** `Authorization: Bearer <token>`

**POST** `/api/klienti/`
- Create new client
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Client data object

**PUT** `/api/klienti/:klientiID`
- Update client information
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Updated client data

**PUT** `/api/klienti/:klientiID/change-password`
- Change client password
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ "currentPassword": "string", "newPassword": "string" }`

**DELETE** `/api/klienti/:klientiID`
- Delete client account
- **Headers:** `Authorization: Bearer <token>`

##### Admin Management

---

**POST** `/api/admin/login`
- Admin login
- **Body:** `{ "email": "string", "password": "string" }`
- **Response:** Admin data and tokens

**GET** `/api/admin/dashboard-stats`
- Get dashboard statistics (admin only)
- **Headers:** `Authorization: Bearer <token>`

**GET** `/api/admin/profile`
- Get current admin profile
- **Headers:** `Authorization: Bearer <token>`

**POST** `/api/admin/`
- Create new admin (admin only)
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Admin data object

**GET** `/api/admin/:adminID`
- Get admin by ID (admin only)
- **Headers:** `Authorization: Bearer <token>`

**PUT** `/api/admin/:adminID`
- Update admin information (admin only)
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Updated admin data

**DELETE** `/api/admin/:adminID`
- Delete admin account (admin only)
- **Headers:** `Authorization: Bearer <token>`

##### Product Management

---

**GET** `/api/produkte/`
- Get all products
- **Headers:** `Authorization: Bearer <token>`
- **Query:** `?category=id&search=term`

**GET** `/api/produkte/paginated`
- Get paginated products
- **Headers:** `Authorization: Bearer <token>`
- **Query:** `?page=1&limit=10`

**GET** `/api/produkte/search`
- Search products
- **Headers:** `Authorization: Bearer <token>`
- **Query:** `?q=search_term`

**GET** `/api/produkte/kategoria/:kategoriaID`
- Get products by category
- **Headers:** `Authorization: Bearer <token>`

**GET** `/api/produkte/:id`
- Get product by ID
- **Headers:** `Authorization: Bearer <token>`

**POST** `/api/produkte/`
- Create new product (admin only)
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Product data object

**PUT** `/api/produkte/:id`
- Update product (admin only)
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Updated product data

**PUT** `/api/produkte/:id/increase-stock`
- Increase product stock (admin only)
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ "quantity": number }`

**PUT** `/api/produkte/:id/reduce-stock`
- Reduce product stock (admin only)
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ "quantity": number }`

**DELETE** `/api/produkte/:id`
- Delete product (admin only)
- **Headers:** `Authorization: Bearer <token>`

##### Shopping Cart Management

---

**GET** `/api/carts/`
- Get all carts (client only)
- **Headers:** `Authorization: Bearer <token>`

**GET** `/api/carts/klienti/:klientiID`
- Get cart by client ID (client only)
- **Headers:** `Authorization: Bearer <token>`

**GET** `/api/carts/:id`
- Get cart by ID (client only)
- **Headers:** `Authorization: Bearer <token>`

**POST** `/api/carts/`
- Create new cart (client only)
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Cart data object

**PUT** `/api/carts/:id`
- Update cart (client only)
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Updated cart data

**DELETE** `/api/carts/:id`
- Delete cart (client only)
- **Headers:** `Authorization: Bearer <token>`

##### Order Management

---

**GET** `/api/porosite/`
- Get all orders
- **Headers:** `Authorization: Bearer <token>`
- **Query:** `?status=id&date_from=date&date_to=date`

**GET** `/api/porosite/statistics`
- Get order statistics
- **Headers:** `Authorization: Bearer <token>`

**GET** `/api/porosite/status/:statusID`
- Get orders by status
- **Headers:** `Authorization: Bearer <token>`

**GET** `/api/porosite/date-range`
- Get orders by date range
- **Headers:** `Authorization: Bearer <token>`
- **Query:** `?start_date=date&end_date=date`

**GET** `/api/porosite/klienti/:klientiID`
- Get orders by client ID
- **Headers:** `Authorization: Bearer <token>`

**GET** `/api/porosite/:id`
- Get order by ID
- **Headers:** `Authorization: Bearer <token>`

**GET** `/api/porosite/:id/items`
- Get order items
- **Headers:** `Authorization: Bearer <token>`

**POST** `/api/porosite/`
- Create new order
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Order data object

**PUT** `/api/porosite/:id`
- Update order
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Updated order data

**PUT** `/api/porosite/:id/status`
- Update order status
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ "statusID": number }`

**DELETE** `/api/porosite/:id`
- Delete order
- **Headers:** `Authorization: Bearer <token>`

##### Payment Management

---

**GET** `/api/pagesa/`
- Get all payments
- **Headers:** `Authorization: Bearer <token>`

**GET** `/api/pagesa/paginated`
- Get paginated payments
- **Headers:** `Authorization: Bearer <token>`
- **Query:** `?page=1&limit=10`

**GET** `/api/pagesa/:id`
- Get payment by ID
- **Headers:** `Authorization: Bearer <token>`

**GET** `/api/pagesa/porosia/:porosiaID`
- Get payments by order ID
- **Headers:** `Authorization: Bearer <token>`

**GET** `/api/pagesa/klienti/:klientiID`
- Get payments by client ID
- **Headers:** `Authorization: Bearer <token>`

**GET** `/api/pagesa/klienti/:klientiID/this-month`
- Get this month's payments by client ID
- **Headers:** `Authorization: Bearer <token>`

**POST** `/api/pagesa/`
- Create new payment
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Payment data object

**PUT** `/api/pagesa/:id`
- Update payment
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Updated payment data

**DELETE** `/api/pagesa/:id`
- Delete payment
- **Headers:** `Authorization: Bearer <token>`

##### Category Management

---

**GET** `/api/kategorite/`
- Get all categories
- **Headers:** `Authorization: Bearer <token>`

**GET** `/api/kategorite/:id`
- Get category by ID
- **Headers:** `Authorization: Bearer <token>`

**POST** `/api/kategorite/`
- Create new category (admin only)
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Category data object

**PUT** `/api/kategorite/:id`
- Update category (admin only)
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Updated category data

**DELETE** `/api/kategorite/:id`
- Delete category (admin only)
- **Headers:** `Authorization: Bearer <token>`

##### Supplier Management

---

**GET** `/api/furnitore/`
- Get all suppliers
- **Headers:** `Authorization: Bearer <token>`

**GET** `/api/furnitore/:id`
- Get supplier by ID
- **Headers:** `Authorization: Bearer <token>`

**POST** `/api/furnitore/`
- Create new supplier (admin only)
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Supplier data object

**PUT** `/api/furnitore/:id`
- Update supplier (admin only)
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Updated supplier data

**DELETE** `/api/furnitore/:id`
- Delete supplier (admin only)
- **Headers:** `Authorization: Bearer <token>`

##### Application Management

---

**GET** `/api/aplikimi/`
- Get all applications
- **Headers:** `Authorization: Bearer <token>`

**GET** `/api/aplikimi/:id`
- Get application by ID
- **Headers:** `Authorization: Bearer <token>`

**POST** `/api/aplikimi/`
- Create new application
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Application data object

**PUT** `/api/aplikimi/:id`
- Update application
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Updated application data

**DELETE** `/api/aplikimi/:id`
- Delete application
- **Headers:** `Authorization: Bearer <token>`

---

#### Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 422 | Unprocessable Entity - Validation error |
| 500 | Internal Server Error - Server error |

---

#### CORS Configuration

The API supports CORS for the following origins:
- `http://localhost:5173` (Development client)
- `http://localhost:5000` (Development server)















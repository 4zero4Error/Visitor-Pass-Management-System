
## Base URL
```
http://localhost:8000/api
```

---

## 1. Health Check
Check if the server is running.

### Request
- **Method**: GET
- **URL**: `http://localhost:8000/api/health`
- **Headers**: None required

### Response
```json
{
  "message": "Visitor Pass Management API is running",
  "status": "ok"
}
```

---

## 2. User Authentication

### 2.1 Register New User
Create a new user account.

### Request
- **Method**: POST
- **URL**: `http://localhost:8000/api/users/register`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON)**:
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "+1234567890",
    "role": "Visitor"
  }
  ```

### Possible Roles
- `Visitor` (default)
- `Employee`
- `Security`
- `Admin`

### Note for Employees/Admins
If role is `Employee` or `Admin`, you can include:
```json
{
  "department": "Engineering",
  "designation": "Software Engineer"
}
```

---

### 2.2 Login
Authenticate an existing user to get a JWT token.

### Request
- **Method**: POST
- **URL**: `http://localhost:8000/api/users/login`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON)**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d21b4667d0d8992e610c85",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "Visitor"
  }
}
```

---

## 3. User Profile (Requires Authentication)
**Important**: For all endpoints below that require authentication, you need to add an Authorization header with the JWT token.

### How to Add Authorization in Postman
1. Go to the "Headers" tab
2. Add a new key: `Authorization`
3. Value: `Bearer YOUR_JWT_TOKEN` (replace YOUR_JWT_TOKEN with the token you got from login)

---

### 3.1 Get Current User Profile
Get the profile details of the currently authenticated user.

### Request
- **Method**: GET
- **URL**: `http://localhost:8000/api/users/profile`
- **Headers**:
  ```
  Authorization: Bearer YOUR_JWT_TOKEN
  ```

---

### 3.2 Update User Profile
Update the profile details of the currently authenticated user. error aa rha isme

### Request
- **Method**: PUT
- **URL**: `http://localhost:8000/api/users/profile`
- **Headers**:
  ```
  Authorization: Bearer YOUR_JWT_TOKEN
  Content-Type: application/json
  ```
- **Body (raw JSON)**:
  ```json
  {
    "fullName": "John Doe Updated",
    "phone": "+0987654321",
    "department": "Marketing",
    "designation": "Marketing Manager"
  }
  ```
  

---

### 3.3 Get All Users (Requires Authentication)
Get a list of all users in the system.

### Request
- **Method**: GET
- **URL**: `http://localhost:8000/api/users`
- **Headers**:
  ```
  Authorization: Bearer YOUR_JWT_TOKEN
  ```

---

## 4. Appointments (Requires Authentication)

### 4.1 Create New Appointment
Create a new visitor appointment.

### Request
- **Method**: POST
- **URL**: `http://localhost:8000/api/appointments`
- **Headers**:
  ```
  Authorization: Bearer YOUR_JWT_TOKEN
  Content-Type: application/json
  ```
- **Body (raw JSON)**:
  ```json
  {
    "host": "60d21b4667d0d8992e610c86", // Host user ID (from GET /api/users)
    "purpose": "Job Interview",
    "meetingLocation": "Conference Room A",
    "meetingDate": "2024-01-01T10:00:00.000Z"
  }
  ```

---

### 4.2 Get My Appointments
Get a list of appointments relevant to the current user.
- Visitors see their own appointments
- Employees see appointments where they are host or visitor
- Admins/Security see all appointments

### Request
- **Method**: GET
- **URL**: `http://localhost:8000/api/appointments`
- **Headers**:
  ```
  Authorization: Bearer YOUR_JWT_TOKEN
  ```

---

### 4.3 Update Appointment Status (Admin/Employee Only)
Approve, reject, or cancel an appointment.
Note: Only Employees who are hosts or Admins can do this.

### Request
- **Method**: PATCH
- **URL**: `http://localhost:8000/api/appointments/:id/status` (replace `:id` with appointment ID)
- **Headers**:
  ```
  Authorization: Bearer YOUR_JWT_TOKEN
  Content-Type: application/json
  ```
- **Body (raw JSON)**:
  ```json
  {
    "status": "Approved",
    "remarks": "Looking forward to the meeting!"
  }
  ```

### Possible Status Values
- `Pending` (default)
- `Approved`
- `Rejected`
- `Cancelled`

---

## 5. Visitor Passes

### 5.1 Verify Visitor Pass (No Authentication Required)
Verify a visitor pass by pass number.

### Request
- **Method**: GET
- **URL**: `http://localhost:8000/api/visitor-passes/verify/:passNumber` (replace `:passNumber` with pass number like `VP-1234567890-123`)

---

### 5.2 Create Visitor Pass (Admin/Security Only)
Issue a visitor pass for an approved appointment.

### Request
- **Method**: POST
- **URL**: `http://localhost:8000/api/visitor-passes`
- **Headers**:
  ```
  Authorization: Bearer YOUR_JWT_TOKEN
  Content-Type: application/json
  ```
- **Body (raw JSON)**:
  ```json
  {
    "appointmentId": "60d21b4667d0d8992e610c87" // Approved appointment ID
  }
  ```

---

### 5.3 Get Visitor Passes (Requires Authentication)
Get a list of visitor passes.
- Visitors see their own passes
- Employees see passes where they are host
- Admins/Security see all passes

### Request
- **Method**: GET
- **URL**: `http://localhost:8000/api/visitor-passes`
- **Headers**:
  ```
  Authorization: Bearer YOUR_JWT_TOKEN
  ```

---

### 5.4 Check In Visitor (Admin/Security Only)
Check in a visitor using their pass.

### Request
- **Method**: POST
- **URL**: `http://localhost:8000/api/visitor-passes/checkin`
- **Headers**:
  ```
  Authorization: Bearer YOUR_JWT_TOKEN
  Content-Type: application/json
  ```
- **Body (raw JSON)**:
  ```json
  {
    "passId": "60d21b4667d0d8992e610c88", // Visitor Pass ID
    "gate": "Main Gate",
    "remarks": "Checked in smoothly"
  }
  ```

---

### 5.5 Check Out Visitor (Admin/Security Only)
Check out a visitor using their pass.

### Request
- **Method**: POST
- **URL**: `http://localhost:8000/api/visitor-passes/checkout`
- **Headers**:
  ```
  Authorization: Bearer YOUR_JWT_TOKEN
  Content-Type: application/json
  ```
- **Body (raw JSON)**:
  ```json
  {
    "passId": "60d21b4667d0d8992e610c88", // Visitor Pass ID
    "gate": "Main Gate",
    "remarks": "Checked out on time"
  }
  ```

---

## Testing Scenarios

### Scenario 1: Complete Visitor Flow
1. Register a Visitor user
2. Login as Visitor
3. Create an appointment (need an Employee/Admin user as host)
4. Login as Employee/Admin who is the host
5. Approve the appointment
6. Login as Admin/Security
7. Create visitor pass from approved appointment
8. Check in the visitor
9. Check out the visitor

### Scenario 2: Test Role-based Access
- Try to create a visitor pass as a Visitor (should fail)
- Try to approve an appointment as a Visitor (should fail)
- Try to check in as an Employee (should fail)

---

## Notes
- Make sure the backend server is running on `http://localhost:8000`
- Make sure MongoDB is connected
- Keep your JWT token safe, as it expires after 7 days

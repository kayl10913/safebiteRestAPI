# SafeBite REST API

This project is a Node.js/Express REST API designed for integration with a Flutter app. It implements endpoints for users, sensors, readings, alerts, food items, activity logs, and sessions, matching the provided MySQL schema.

## Features
- User registration, authentication, and management
- Sensor CRUD and assignment
- Reading submission and retrieval
- Alert creation and listing
- Food item management
- Activity logging
- Session management (token-based)
- Dashboard analytics (sensor activity, food detections, food risk)

## Setup
1. Install dependencies:
'''
npm install
'''
2. Configure your database connection in `.env` (to be created).
3. Run the server:
'''
npm start
'''

## Endpoints

### User Endpoints
- `POST /api/newuser` — Register a new user
  - **Body:** `{ first_name, last_name, username, email, password }`
- `POST /api/login` — User login
  - **Body:** `{ email, password }`
- `GET /api/users/:id` — Get user by ID
- `PUT /api/users/:userId` — Update user profile
  - **Body:** `{ first_name?, last_name?, username?, email?, contact_number?, password? }`

### Notification Endpoints
- `GET /api/alerts` — List all alerts (for notifications)

### Dashboard Endpoints
- `GET /api/dashboard/recent-food?date=YYYY-MM-DD` — Recent food detections for a date (optional `date` param)
- `GET /api/dashboard/sensor-activity?date=YYYY-MM-DD` — Sensor usage count for a date
  - Or use `?start=YYYY-MM-DD&end=YYYY-MM-DD` for a range

### Analytics Endpoints
- `GET /api/analytics/recent-food?date=YYYY-MM-DD` — Recent food detections (same as dashboard, for analytics)
- `GET /api/analytics/sensor-activity?date=YYYY-MM-DD` — Sensor usage count (same as dashboard, for analytics)
- `GET /api/analytics/food-risk?date=YYYY-MM-DD` — Food risk score for a date
  - Or use `?start=YYYY-MM-DD&end=YYYY-MM-DD` for a range

#### Example: Food Risk Response
'''json
{
  "success": true,
  "score": 40,
  "total": 10,
  "risky": 4
}
'''

#### Example: Sensor Activity Response
'''json
{
  "success": true,
  "usage_count": 42
}
'''

#### Example: Recent Food Detections Response
'''json
{
  "success": true,
  "data": [
    { "food": "Adobo", "date": "Jun 1, 2025", "status": "Good" },
    { "food": "Sinigang", "date": "Jun 3, 2025", "status": "Spoilt" }
  ]
}
'''

## Next Steps
- Implement models, controllers, and routes for each table.
- Add authentication middleware.
- Connect to MySQL using `mysql2` or `sequelize`.

---

This file will be updated as the implementation progresses.
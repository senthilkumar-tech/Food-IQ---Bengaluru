FoodIQ – Bengaluru Restaurant Analytics Platform

Overview

FoodIQ is a full-stack web application developed to analyze and visualize restaurant data from Bengaluru. The platform provides insights into restaurant ratings, customer reviews, cuisine trends, and area-wise performance through an interactive dashboard.

The project was built to gain hands-on experience in full-stack development, database management, REST API development, and cloud deployment.

Features

* Dashboard with key performance indicators
* Area-wise restaurant performance analysis
* Cuisine-based analytics
* Top-rated restaurants listing
* Most-reviewed restaurants listing
* Restaurant search functionality
* Restaurant location mapping
* Interactive charts and visualizations

Technology Stack

Frontend

* React.js
* Vite
* Axios
* React Router DOM
* Chart.js
* CSS

Backend

* Node.js
* Express.js

Database

* MySQL
* Railway

Deployment

* Vercel (Frontend)
* Render (Backend)

Project Structure

```text
FoodIQ-Bengaluru
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   └── services
│
├── backend
│   ├── routes
│   ├── db.js
│   └── server.js
│
└── README.md
```

API Endpoints

| Endpoint            | Description               |
| ------------------- | ------------------------- |
| /api/kpis           | Dashboard KPIs            |
| /api/restaurants    | Restaurant dataset        |
| /api/areas          | Area performance metrics  |
| /api/cuisines       | Cuisine analysis          |
| /api/toprated       | Top-rated restaurants     |
| /api/topreviews     | Most-reviewed restaurants |
| /api/maprestaurants | Restaurant map data       |
| /api/search/:term   | Search restaurants        |

Installation

Clone Repository

```bash
git clone https://github.com/your-username/FoodIQ-Bengaluru.git
```
Frontend

```bash
cd frontend
npm install
npm run dev
```

Backend

```bash
cd backend
npm install
npm start
```

Deployment

Frontend is deployed using Vercel.

Backend is deployed using Render.

Database is hosted on Railway MySQL.

What I Learned

* Building REST APIs using Express.js
* Managing relational databases with MySQL
* Connecting React applications to backend services
* Working with cloud-hosted databases
* Deploying full-stack applications
* Debugging production deployment issues
* Using Git and GitHub for version control

Future Improvements

* User authentication
* Advanced filtering options
* Restaurant recommendation system
* Real-time analytics
* Mobile optimization

Author

Senthil Kumar T

B.E. Computer Science and Engineering (IoT)

Paavai Engineering College

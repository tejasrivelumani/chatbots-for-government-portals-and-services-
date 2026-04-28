


GovBot – Chatbot for Government Services

GovBot is a web-based application that provides guided access to common government services through an interactive chatbot and a structured user interface. It reduces the need for users to navigate multiple portals by centralizing service-related information in one place.


##  Key Functionalities

* Provides step-by-step guidance for government services
* Supports services such as Aadhaar, PAN, Voter ID, Pension, and Driving License
* Offers quick-access buttons for frequently used services
* Uses a chatbot interface to handle user queries
* Displays structured responses based on user input



##  Frontend Implementation

The frontend is responsible for user interaction and interface rendering.

### Features

* Chat interface for user queries
* Sidebar navigation for service selection
* Quick-access service cards
* Structured layout for response display

### Responsibility

* Captures user input
* Sends requests to backend APIs
* Displays responses received from backend



##  Backend Implementation

The backend handles all processing and response generation.

### Features

* REST API for handling client requests
* Query processing logic to interpret user input
* Service mapping to match queries with relevant services
* Response generation with predefined or structured data

### Responsibility

* Receives input from frontend
* Identifies user intent
* Fetches or constructs appropriate responses
* Sends structured output back to frontend


## System Workflow

1. User enters a query or selects a service
2. Frontend sends the request to backend API
3. Backend processes the query and identifies intent
4. Backend maps the query to a service and prepares response
5. Response is returned to frontend
6. Frontend displays the result to the user



## Tech Stack

* Frontend: HTML, CSS, JavaScript
* Backend: Node.js, Express.js
* Communication: REST APIs (JSON-based)



##  Project Setup

### Prerequisites

* Node.js installed



### Installation & Execution

#### 1. Clone Repository

```bash
git clone https://github.com/tejasrivelumani/chatbots-for-government-portals-and-services-
cd chatbots-for-government-portals-and-services-
```

#### 2. Start Backend

```bash
cd backend
npm install
npm start
```

#### 3. Start Frontend

```bash
cd frontend
npm install
npm start
```

The application will run on `http://localhost:3000` (frontend), with backend running in parallel.



##  Disclaimer

This application provides guidance for government services. Users should verify final details through official government portals before taking action.



##  License

This project is developed for academic purposes only and is not intended for commercial use


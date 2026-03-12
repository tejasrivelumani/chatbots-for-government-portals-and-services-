require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const axios = require("axios");   // ✅ Use axios instead of exec

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Intent → Response mapping
const responses = {
  Apply_Aadhaar: "You can apply for Aadhaar at nearest Aadhaar center.",
  Voter_ID_Application: "Visit NVSP portal to apply for voter ID.",
  Check_Pension_Status: "You can check pension status on the government portal.",
  Complaint_Registration: "You can register complaints on the government grievance portal.",
  Electricity_Bill_Payment: "Pay electricity bill through the official electricity board website.",
  Water_Bill_Payment: "You can pay water bill through municipality portal.",
  Ration_Card_Application: "Apply for ration card via state food department portal.",
  Scheme_Eligibility_Check: "Check scheme eligibility on official government scheme portal.",
  Scholarship_Information: "Visit scholarship portal for detailed information.",
  Driving_License_Application: "Apply for driving license via Parivahan website."
};

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// NEW FAST PREDICT ROUTE
app.post("/predict", async (req, res) => {
  try {
    const userText = req.body.message;

    // Call Flask API instead of running Python file
    const response = await axios.post("http://127.0.0.1:5000/predict", {
      message: userText
    });

    const intent = response.data.intent;

    res.json({
      intent: intent,
      reply: responses[intent] || "Sorry, I don't understand."
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error processing request");
  }
});

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(` Backend running on port ${PORT}`);
});
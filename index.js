require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const axios = require("axios");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// ── RICH Intent → Response mapping ──
const responses = {
  Apply_Aadhaar: {
    title: "Aadhaar Card Application",
    steps: [
      "Visit the official UIDAI website: uidai.gov.in or go to your nearest Aadhaar Enrollment Centre.",
      "Carry original documents: Proof of Identity (Passport/PAN/Voter ID) and Proof of Address (Utility bill/Bank statement).",
      "Fill the Aadhaar Enrollment Form at the centre and provide biometrics (fingerprints + iris scan).",
      "You will receive an Enrollment ID slip — use it to track your Aadhaar status online.",
      "Your Aadhaar card will be delivered to your registered address within 90 days, or download e-Aadhaar from uidai.gov.in."
    ],
    link: "https://uidai.gov.in",
    linkText: "Visit UIDAI Official Portal"
  },

  Voter_ID_Application: {
    title: "Voter ID (EPIC) Application",
    steps: [
      "Go to the National Voters' Service Portal: voters.eci.gov.in.",
      "Click 'Register as New Voter' and fill Form 6 online.",
      "Upload documents: recent passport-size photo, age proof (birth certificate/10th marksheet), and address proof.",
      "Submit the form. A Booth Level Officer (BLO) may visit to verify your details.",
      "Track your application status on the NVSP portal using your reference number.",
      "Your Voter ID (EPIC card) will be delivered to your address within 30–45 days."
    ],
    link: "https://voters.eci.gov.in",
    linkText: "Apply on NVSP Portal"
  },

  Check_Pension_Status: {
    title: "Pension Status Check",
    steps: [
      "For Central Government employees: Visit pensionersportal.gov.in.",
      "For EPFO pension: Login at unifiedportal-mem.epfindia.gov.in using your UAN number.",
      "For State Government pension: Visit your respective State Treasury or Finance Department portal.",
      "For PM Kisan or social welfare schemes: Visit pmkisan.gov.in or your state's social welfare portal.",
      "You can also call the Pension Helpline: 1800-11-77-88 (toll-free)."
    ],
    link: "https://pensionersportal.gov.in",
    linkText: "Visit Pensioners Portal"
  },

  Complaint_Registration: {
    title: "Government Complaint Registration",
    steps: [
      "For Central Government grievances: Visit pgportal.gov.in (CPGRAMS — Centralised Public Grievance Redress System).",
      "Register/Login and click 'Lodge Public Grievance'.",
      "Select the Ministry/Department your complaint belongs to.",
      "Describe your issue clearly and attach supporting documents if any.",
      "You will receive a unique Registration Number to track your complaint.",
      "Response is typically given within 30 days. Escalate if not resolved."
    ],
    link: "https://pgportal.gov.in",
    linkText: "File Complaint on CPGRAMS"
  },

  Electricity_Bill_Payment: {
    title: "Electricity Bill Payment",
    steps: [
      "Visit your state electricity board's official website (e.g., TNEB, BESCOM, MSEDCL, etc.).",
      "Click on 'Pay Bill Online' or 'Quick Pay'.",
      "Enter your Consumer Number or Service Number printed on your bill.",
      "Verify the outstanding amount and pay via Net Banking, UPI, Debit/Credit Card.",
      "You can also pay via BHIM UPI, PhonePe, Google Pay, or Paytm by scanning your bill QR code.",
      "Download/save your payment receipt immediately after transaction."
    ],
    link: "https://www.india.gov.in/topics/energy/electricity",
    linkText: "Find Your State Electricity Board"
  },

  Water_Bill_Payment: {
    title: "Water Bill Payment",
    steps: [
      "Visit your local Municipal Corporation or Water Board's official website.",
      "Look for 'Online Bill Payment' or 'Water Tax' section.",
      "Enter your Consumer ID or Property ID (found on your previous water bill).",
      "Check the due amount and pay using Net Banking, UPI, or Card.",
      "You can also pay at your local municipality office or through Common Service Centres (CSC).",
      "Save your payment receipt or reference number for future use."
    ],
    link: "https://www.india.gov.in",
    linkText: "Visit India Government Portal"
  },

  Ration_Card_Application: {
    title: "Ration Card Application",
    steps: [
      "Visit your State's Food & Civil Supplies Department portal (e.g., Tamil Nadu: tnpds.gov.in).",
      "Click on 'Apply for New Ration Card' and fill the application form.",
      "Required documents: Aadhaar card of all family members, income proof, address proof, recent passport photos.",
      "Submit the application online or at your nearest Taluk/Block office.",
      "An inspector may visit your residence for verification.",
      "Track your application status online. Card is issued within 30–60 days of approval."
    ],
    link: "https://nfsa.gov.in",
    linkText: "Visit National Food Security Portal"
  },

  Scheme_Eligibility_Check: {
    title: "Government Scheme Eligibility",
    steps: [
      "Visit the MyScheme portal: myscheme.gov.in — India's one-stop platform for all government schemes.",
      "Click 'Find Schemes for Me' and answer a few questions (age, category, income, state, etc.).",
      "The portal will list all schemes you are eligible for across health, education, agriculture, housing, etc.",
      "Popular schemes: PM Awas Yojana (housing), Ayushman Bharat (health), PM Kisan (farmers), Sukanya Samriddhi (girl child).",
      "Click on any scheme to see detailed eligibility, benefits, and how to apply."
    ],
    link: "https://www.myscheme.gov.in",
    linkText: "Check Eligibility on MyScheme"
  },

  Scholarship_Information: {
    title: "Scholarship Information",
    steps: [
      "Visit the National Scholarship Portal: scholarships.gov.in — the single portal for all central scholarships.",
      "Register with your Aadhaar number and fill in your academic and income details.",
      "Available scholarships: Pre-Matric, Post-Matric, Merit-cum-Means for minorities, OBC, SC/ST students.",
      "State scholarships are available on your state's education department portal.",
      "Required documents: Income certificate, caste certificate, marksheets, bank account details, Aadhaar.",
      "Apply before the deadline — most scholarships open between July–November each year."
    ],
    link: "https://scholarships.gov.in",
    linkText: "Apply on National Scholarship Portal"
  },

  Driving_License_Application: {
    title: "Driving License Application",
    steps: [
      "Visit the Parivahan Sewa portal: parivahan.gov.in/parivahan.",
      "First apply for a Learner's License (LL) — fill Form 1 & 2, pay fee, and appear for an online test.",
      "After 30 days of holding LL, apply for a Permanent Driving License (DL).",
      "Book a slot for the driving test at your nearest Regional Transport Office (RTO).",
      "Required documents: Age proof, address proof, passport-size photos, and your Learner's License.",
      "After passing the driving test, your DL will be issued and delivered within 7–10 working days."
    ],
    link: "https://parivahan.gov.in",
    linkText: "Apply on Parivahan Portal"
  }
};

// Test route
app.get('/', (req, res) => {
  res.send('GovBot Backend is running!');
});

// ── PREDICT ROUTE ──
app.post("/predict", async (req, res) => {
  try {
    const userText = req.body.message;

    const flaskResponse = await axios.post("http://127.0.0.1:5000/predict", {
      message: userText
    });

    const intent = flaskResponse.data.intent;
    const responseData = responses[intent];

    if (responseData) {
      res.json({
        intent: intent,
        title: responseData.title,
        steps: responseData.steps,
        link: responseData.link,
        linkText: responseData.linkText
      });
    } else {
      res.json({
        intent: intent,
        title: "Service Information",
        steps: ["I detected your intent but don't have detailed information yet. Please visit india.gov.in for all government services."],
        link: "https://www.india.gov.in",
        linkText: "Visit India Government Portal"
      });
    }

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Error processing request. Make sure Flask server is running on port 5000." });
  }
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`✅ GovBot Backend running on http://localhost:${PORT}`);
});

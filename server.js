const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const APP_ID = process.env.CF_APP_ID;
const SECRET_KEY = process.env.CF_SECRET_KEY;

app.post("/create-order", async (req, res) => {
  try {
    const orderId = "order_" + Date.now();
    const payload = {
      order_id: orderId,
      order_amount: 1.00,
      order_currency: "INR",
      customer_details: {
        customer_id: "hdiedbsnd",
        customer_email: "amiteantndh@gamil.com",
        customer_phone: "9822786588"
      },
      order_note: "Test Order",
      return_url: "https://g1backk.github.io/Ample-/#", // ✅ update this!
      payment_method: {
        upi: {
          mode: "intent" // ✅ suggest intent UPI
        }
      }
    };

    const response = await axios.post(
      "https://api.cashfree.com/pg/orders",
      payload,
      {
        headers: {
          "x-api-version": "2022-09-01",
          "x-client-id": APP_ID,
          "x-client-secret": SECRET_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ payment_session_id: response.data.payment_session_id });
  } catch (error) {
    console.error("Cashfree error:", error.response?.data || error.message);
    res.status(500).json({ error: "Cashfree order failed." });
  }
});

app.listen(PORT, () => console.log("Server running on port", PORT));

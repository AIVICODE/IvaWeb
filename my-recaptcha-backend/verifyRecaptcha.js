const fetch = require("node-fetch");


const API_KEY = process.env.RECAPTCHA_API_KEY;
const SITE_KEY = process.env.RECAPTCHA_SITE_KEY;


module.exports = async (req, res) => {
  const token = req.body.token;
  const expectedAction = req.body.action || "default-action";

  if (!token) {
    return res.status(400).json({ success: false, message: "Token es requerido" });
  }

  try {
    const url = `https://recaptchaenterprise.googleapis.com/v1/projects/ivaweb-1735514742960/assessments?key=${API_KEY}`;

    const body = {
      event: {
        token,
        siteKey: SITE_KEY,
        expectedAction,
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.tokenProperties && data.tokenProperties.valid) {
      return res.status(200).json({ success: true, score: data.riskAnalysis.score });
    } else {
      return res.status(400).json({ success: false, message: "Token inválido o no verificado" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

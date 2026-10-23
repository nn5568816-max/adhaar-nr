
module.exports = (req, res) => {
  const { id, format } = req.query;

  const metadata = {
    channel: "https://t.me/priyanshuexploits",
    developer: "Priyanshu Gupta ❤️",
    service: "National Identity & Directory Engine",
    version: "2.0-ULTRA"
  };

  if (!id) {
    return res.status(400).json({
      error: "Missing 'id' query parameter. Example: /api/lookup?id=123412341234&format=card",
      metadata,
      status: false
    });
  }

  if (format === "card") {
    return res.status(200).json({
      service: metadata.service,
      status: true,
      format: "card",
      id: id,
      message: "Demo response only. No identity data was retrieved.",
      metadata
    });
  }

  return res.status(200).json({
    endpoints: {
      card_view: `/api/lookup?id=${encodeURIComponent(id)}&format=card`,
      json_view: `/api/lookup?id=${encodeURIComponent(id)}`
    },
    metadata,
    service: metadata.service,
    status: true,
    message: "Demo response only. No identity data was retrieved."
  });
};

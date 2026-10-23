
export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({
      status: false,
      error: "Method not allowed"
    });
  }

  const { id, format } = req.query;

  if (!id) {
    return res.status(400).json({
      status: false,
      error: "Missing 'id' query parameter",
      example: "/api/lookup?id=demo123&format=card"
    });
  }

  // Demo data only. Replace with records you are
  // authorized to access. Do not use Aadhaar numbers
  // as public lookup keys.
  const database = {
    demo123: [
      {
        name: "Demo User",
        phone: "***-***-1234",
        address: "Demo Address",
        valid: true
      }
    ]
  };

  const records = database[String(id)];

  if (!records) {
    return res.status(404).json({
      status: false,
      error: "Record not found"
    });
  }

  if (format === "card") {
    const lines = [
      "╔══════════════════════════════╗",
      "║          STATUS CARD         ║",
      "╚══════════════════════════════╝",
      "",
      `Status: SUCCESS`,
      `Count: ${records.length}`,
      ...records.flatMap((record, index) => [
        "",
        `--- Card ${index + 1} ---`,
        `Name: ${record.name}`,
        `Phone: ${record.phone}`,
        `Address: ${record.address}`,
        `Valid: ${record.valid ? "Yes" : "No"}`
      ])
    ];

    return res.status(200).json({
      status: true,
      count: records.length,
      card: lines.join("\n")
    });
  }

  return res.status(200).json({
    status: true,
    count: records.length,
    records
  });
}

export default (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization,Accept,Content-Type"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Replace this code with your own logic to handle the request
  res.json({ message: "Hello World" });
};

export const checkApiKey = (req, res, next) => {
  if (req.query.apikey !== "123456") {
    return res.status(401).json({ message: "Sai API Key" });
  }
  next();
};


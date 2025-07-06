const authMiddleware = (req: any, res: any, next: () => void) => {
  const token = JSON.parse(req.headers.authorization?.split("Bearer ")[1]);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    req.user = JSON.parse(token);
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
export default authMiddleware;

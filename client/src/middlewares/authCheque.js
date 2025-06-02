async function restrictToLoggedUserOnly(req,res,next) {
  // Check if user is logged in
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized, please log in" });
  }

  // Check if the user ID in the request matches the logged-in user ID
  if (req.params.id && req.params.id !== req.user.id) {
    return res.status(403).json({ error: "Forbidden, you can only access your own data" });
  }

  next();
    
}
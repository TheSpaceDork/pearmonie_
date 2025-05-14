import app from "./app";
import { connectDB } from "./utils/connectDB";

const port = process.env.PORT || 5000;

// Ensures the server only starts if the database is connected
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database", err);
    process.exit(1);
  });

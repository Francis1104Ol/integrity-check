
import app from "./app.js";
import env from "./config/env.js";
import connectDB from "./config/database.js";

const startServer = async () => {
  try {
    await connectDB();

    app.listen(env.port, () => {
      console.log(
        `🚀 IntegrityCheck server running on port ${env.port} (${env.nodeEnv})`
      );
    });
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
};

startServer();
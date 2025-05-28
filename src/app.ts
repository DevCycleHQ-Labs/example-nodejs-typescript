import dotenv from "dotenv";
dotenv.config();
import "./types/express-augmentation";
import express, { Request, Response, NextFunction } from "express";
import { initializeDevCycleClient } from "./devcycle";
import greetingHandler from "./routes/greeting";
import { logVariation } from "./utils/logVariation";

async function run() {
  const devcycleClient = await initializeDevCycleClient();

  const app = express();
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use((req, res, next) => {
    res.set({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Access-Control-Allow-Origin, Content-Type",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    });
    next();
  });
  app.use((req: Request, res: Response, next: NextFunction) => {
    /**
     * In a real application you would build the user object based on the
     * authenticated user
     */
    req.user = {
      user_id: "user123",
      name: "Jane Doe",
      email: "jane.doe@email.com",
    };
    next();
  });

  /**
   * Return a greeting based on the value of the example-text variable
   */
  app.get("/", greetingHandler);

  /**
   * Return all variable values for debugging purposes
   */
  app.get("/variables", (req: Request, res: Response) => {
    const variables = devcycleClient.allVariables(req.user);
    res.json(variables);
  });

  /**
   * Log togglebot to the console using the togglebot-spin and togglebot-wink
   * variables to control the output
   */
  logVariation();

  return app;
}

export default run;

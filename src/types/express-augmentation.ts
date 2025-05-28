import { DevCycleUser } from "@devcycle/nodejs-server-sdk";

declare global {
  namespace Express {
    interface Request {
      user: DevCycleUser;
    }
  }
}

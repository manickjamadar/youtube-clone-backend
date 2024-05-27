import { Router } from "express";
import authRouter from "./auth.routes";

const rootRouter = Router();
rootRouter.use("/v1/auth", authRouter);
export default rootRouter;

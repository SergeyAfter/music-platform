import { Router } from "express";
import tracksRouter from "./tracks";
import usersRouter from "./users";

const router = Router();

router.use("/tracks", tracksRouter);
router.use("/users", usersRouter);

export default router;

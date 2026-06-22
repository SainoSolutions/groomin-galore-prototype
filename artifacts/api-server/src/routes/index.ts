import { Router, type IRouter } from "express";
import healthRouter from "./health";
import servicesRouter from "./services";
import offersRouter from "./offers";
import testimonialsRouter from "./testimonials";
import academyRouter from "./academy";
import locationsRouter from "./locations";
import galleryRouter from "./gallery";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(servicesRouter);
router.use(offersRouter);
router.use(testimonialsRouter);
router.use(academyRouter);
router.use(locationsRouter);
router.use(galleryRouter);
router.use(statsRouter);

export default router;

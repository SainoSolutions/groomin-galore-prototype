import { Router, type IRouter } from "express";
import { db, servicesTable, locationsTable, testimonialsTable, offersTable } from "@workspace/db";
import { GetStatsResponse } from "@workspace/api-zod";
import { eq, count } from "drizzle-orm";

const router: IRouter = Router();

router.get("/stats", async (_req, res): Promise<void> => {
  const [services] = await db.select({ count: count() }).from(servicesTable);
  const [locations] = await db.select({ count: count() }).from(locationsTable);
  const [testimonials] = await db.select({ count: count() }).from(testimonialsTable).where(eq(testimonialsTable.isVisible, true));
  const [activeOffers] = await db.select({ count: count() }).from(offersTable).where(eq(offersTable.isActive, true));

  res.json(
    GetStatsResponse.parse({
      totalServices: Number(services?.count ?? 0),
      totalLocations: Number(locations?.count ?? 0),
      totalTestimonials: Number(testimonials?.count ?? 0),
      activeOffers: Number(activeOffers?.count ?? 0),
      yearsOfExperience: 8,
      happyClients: 5000,
      academyStudents: 350,
    })
  );
});

export default router;

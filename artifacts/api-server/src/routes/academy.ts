import { Router, type IRouter } from "express";
import { db, academyTable } from "@workspace/db";
import {
  GetAcademyResponse,
  UpdateAcademyBody,
  UpdateAcademyResponse,
} from "@workspace/api-zod";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

const mapAcademy = (row: typeof academyTable.$inferSelect) => ({
  ...row,
  fee: row.fee != null ? Number(row.fee) : null,
});

router.get("/academy", async (_req, res): Promise<void> => {
  const rows = await db.select().from(academyTable).limit(1);
  if (!rows[0]) {
    res.status(404).json({ error: "Academy info not found" });
    return;
  }
  res.json(GetAcademyResponse.parse(mapAcademy(rows[0])));
});

router.patch("/academy", async (req, res): Promise<void> => {
  const parsed = UpdateAcademyBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const rows = await db.select().from(academyTable).limit(1);
  if (!rows[0]) {
    res.status(404).json({ error: "Academy info not found" });
    return;
  }
  const { fee, ...rest } = parsed.data;
  const updates: Record<string, unknown> = { ...rest };
  if (fee !== undefined) updates.fee = fee != null ? String(fee) : null;

  const [row] = await db
    .update(academyTable)
    .set(updates)
    .where(eq(academyTable.id, rows[0].id))
    .returning();
  res.json(UpdateAcademyResponse.parse(mapAcademy(row)));
});

export default router;

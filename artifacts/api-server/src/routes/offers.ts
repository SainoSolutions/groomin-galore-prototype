import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, offersTable } from "@workspace/db";
import {
  ListOffersResponse,
  CreateOfferBody,
  UpdateOfferParams,
  UpdateOfferBody,
  UpdateOfferResponse,
  DeleteOfferParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

const mapOffer = (row: typeof offersTable.$inferSelect) => ({
  ...row,
  discountPercent: row.discountPercent != null ? Number(row.discountPercent) : null,
  discountAmount: row.discountAmount != null ? Number(row.discountAmount) : null,
  createdAt: row.createdAt.toISOString(),
});

router.get("/offers", async (_req, res): Promise<void> => {
  const rows = await db.select().from(offersTable).orderBy(offersTable.id);
  res.json(ListOffersResponse.parse(rows.map(mapOffer)));
});

router.post("/offers", async (req, res): Promise<void> => {
  const parsed = CreateOfferBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { discountPercent, discountAmount, ...rest } = parsed.data;
  const [row] = await db
    .insert(offersTable)
    .values({
      ...rest,
      discountPercent: discountPercent != null ? String(discountPercent) : null,
      discountAmount: discountAmount != null ? String(discountAmount) : null,
    })
    .returning();
  res.status(201).json(UpdateOfferResponse.parse(mapOffer(row)));
});

router.patch("/offers/:id", async (req, res): Promise<void> => {
  const params = UpdateOfferParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateOfferBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { discountPercent, discountAmount, ...rest } = parsed.data;
  const updates: Record<string, unknown> = { ...rest };
  if (discountPercent !== undefined)
    updates.discountPercent = discountPercent != null ? String(discountPercent) : null;
  if (discountAmount !== undefined)
    updates.discountAmount = discountAmount != null ? String(discountAmount) : null;

  const [row] = await db
    .update(offersTable)
    .set(updates)
    .where(eq(offersTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Offer not found" });
    return;
  }
  res.json(UpdateOfferResponse.parse(mapOffer(row)));
});

router.delete("/offers/:id", async (req, res): Promise<void> => {
  const params = DeleteOfferParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [row] = await db
    .delete(offersTable)
    .where(eq(offersTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Offer not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;

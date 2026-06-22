import { Router, type IRouter } from "express";
import { eq, ilike } from "drizzle-orm";
import { db, servicesTable } from "@workspace/db";
import {
  ListServicesQueryParams,
  ListServicesResponse,
  CreateServiceBody,
  GetServiceParams,
  GetServiceResponse,
  UpdateServiceParams,
  UpdateServiceBody,
  UpdateServiceResponse,
  DeleteServiceParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/services", async (req, res): Promise<void> => {
  const query = ListServicesQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }
  let rows = await db.select().from(servicesTable).orderBy(servicesTable.id);
  if (query.data.category) {
    rows = rows.filter((s) =>
      s.category.toLowerCase() === query.data.category!.toLowerCase()
    );
  }
  const mapped = rows.map((s) => ({
    ...s,
    price: Number(s.price),
    discountedPrice: s.discountedPrice != null ? Number(s.discountedPrice) : null,
    createdAt: s.createdAt.toISOString(),
  }));
  res.json(ListServicesResponse.parse(mapped));
});

router.post("/services", async (req, res): Promise<void> => {
  const parsed = CreateServiceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { price, discountedPrice, ...rest } = parsed.data;
  const [row] = await db
    .insert(servicesTable)
    .values({
      ...rest,
      price: String(price),
      discountedPrice: discountedPrice != null ? String(discountedPrice) : null,
    })
    .returning();
  res.status(201).json(
    GetServiceResponse.parse({
      ...row,
      price: Number(row.price),
      discountedPrice: row.discountedPrice != null ? Number(row.discountedPrice) : null,
      createdAt: row.createdAt.toISOString(),
    })
  );
});

router.get("/services/:id", async (req, res): Promise<void> => {
  const params = GetServiceParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [row] = await db
    .select()
    .from(servicesTable)
    .where(eq(servicesTable.id, params.data.id));
  if (!row) {
    res.status(404).json({ error: "Service not found" });
    return;
  }
  res.json(
    GetServiceResponse.parse({
      ...row,
      price: Number(row.price),
      discountedPrice: row.discountedPrice != null ? Number(row.discountedPrice) : null,
      createdAt: row.createdAt.toISOString(),
    })
  );
});

router.patch("/services/:id", async (req, res): Promise<void> => {
  const params = UpdateServiceParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateServiceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { price, discountedPrice, ...rest } = parsed.data;
  const updates: Record<string, unknown> = { ...rest };
  if (price !== undefined) updates.price = String(price);
  if (discountedPrice !== undefined)
    updates.discountedPrice = discountedPrice != null ? String(discountedPrice) : null;

  const [row] = await db
    .update(servicesTable)
    .set(updates)
    .where(eq(servicesTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Service not found" });
    return;
  }
  res.json(
    UpdateServiceResponse.parse({
      ...row,
      price: Number(row.price),
      discountedPrice: row.discountedPrice != null ? Number(row.discountedPrice) : null,
      createdAt: row.createdAt.toISOString(),
    })
  );
});

router.delete("/services/:id", async (req, res): Promise<void> => {
  const params = DeleteServiceParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [row] = await db
    .delete(servicesTable)
    .where(eq(servicesTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Service not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;

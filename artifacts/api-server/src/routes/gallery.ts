import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, galleryTable } from "@workspace/db";
import {
  ListGalleryResponse,
  CreateGalleryImageBody,
  DeleteGalleryImageParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/gallery", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(galleryTable)
    .orderBy(galleryTable.sortOrder, galleryTable.id);
  res.json(ListGalleryResponse.parse(rows));
});

router.post("/gallery", async (req, res): Promise<void> => {
  const parsed = CreateGalleryImageBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db.insert(galleryTable).values(parsed.data).returning();
  res.status(201).json(row);
});

router.delete("/gallery/:id", async (req, res): Promise<void> => {
  const params = DeleteGalleryImageParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [row] = await db
    .delete(galleryTable)
    .where(eq(galleryTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Gallery image not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;

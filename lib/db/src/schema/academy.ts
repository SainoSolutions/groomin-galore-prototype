import { pgTable, text, serial, boolean, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const academyTable = pgTable("academy", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  courses: text("courses").notNull(),
  duration: text("duration"),
  fee: numeric("fee", { precision: 10, scale: 2 }),
  credentialInfo: text("credential_info"),
  internationalRecognition: text("international_recognition"),
  inquiryEmail: text("inquiry_email"),
  inquiryPhone: text("inquiry_phone"),
  isActive: boolean("is_active").notNull().default(true),
});

export const insertAcademySchema = createInsertSchema(academyTable).omit({ id: true });
export type InsertAcademy = z.infer<typeof insertAcademySchema>;
export type Academy = typeof academyTable.$inferSelect;

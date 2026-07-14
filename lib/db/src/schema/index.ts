import { pgTable, text, serial, timestamp, varchar, integer } from "drizzle-orm/pg-core";

export const articleViewsTable = pgTable("article_views", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull(),
  deviceType: varchar("device_type", { length: 50 }).notNull(), // mobile, tablet, desktop
  os: varchar("os", { length: 50 }).notNull(),                 // macOS, iOS, Windows, Android, Linux, etc.
  userAgent: text("user_agent"),
  viewedAt: timestamp("viewed_at").defaultNow().notNull(),
});

export const articleClapsTable = pgTable("article_claps", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  count: integer("count").default(0).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type ArticleView = typeof articleViewsTable.$inferSelect;
export type InsertArticleView = typeof articleViewsTable.$inferInsert;

export type ArticleClap = typeof articleClapsTable.$inferSelect;
export type InsertArticleClap = typeof articleClapsTable.$inferInsert;
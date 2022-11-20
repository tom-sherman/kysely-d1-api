import {
  ColumnType,
  Kysely,
} from "https://cdn.jsdelivr.net/npm/kysely/dist/esm/index.js";
import { D1APIDialect } from "./driver.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

const { D1_ACCOUNT_ID, D1_API_KEY, D1_DB_NAME } = config();

export interface BlogPostsTable {
  Slug: ColumnType<string>;
  Title: ColumnType<string>;
}

interface Database {
  BlogPosts: BlogPostsTable;
}

const db = new Kysely<Database>({
  dialect: new D1APIDialect({
    accountId: D1_ACCOUNT_ID,
    apiKey: D1_API_KEY,
    databaseName: D1_DB_NAME,
  }),
});

const result = await db.selectFrom("BlogPosts").select("BlogPosts.Title")
  .executeTakeFirstOrThrow();

console.log(result);

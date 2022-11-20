# kysely d1 api driver

So you can use kysely with d1 outside of cloudflare workers.

> **Warning**: This is just a proof of concept. See discussion at https://github.com/aidenwallis/kysely-d1/issues/7 for more info.

```ts
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
```

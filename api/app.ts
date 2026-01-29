import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!);

await sql`CREATE TABLE IF NOT EXISTS visitors (id SERIAL PRIMARY KEY, time TIMESTAMPTZ DEFAULT NOW())`;

const server = Bun.serve({
  port: 4000,
  async fetch() {
    await sql`INSERT INTO visitors DEFAULT VALUES`;

    // some heavy work
    await Bun.sleep(50);
    
    const recentVisitors = await sql`SELECT * FROM visitors ORDER BY id DESC LIMIT 5`;

    return Response.json({
      recent: recentVisitors,
      apiHost: process.env.HOSTNAME,
    });
  },
});

console.log(`Listening on http://localhost:${server.port}`);

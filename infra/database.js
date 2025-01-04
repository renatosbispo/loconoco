import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  await client.connect();

  try {
    const result = await client.query(queryObject);

    return result;
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
}

async function getConnectionsMax() {
  const { rows } = await query("SHOW max_connections;");

  return parseInt(rows[0].max_connections);
}

async function getConnectionsOpened(dbName) {
  const { rows } = await query({
    text: "SELECT COUNT(*) FROM pg_stat_activity WHERE datname = $1;",
    values: [dbName],
  });

  return parseInt(rows[0].count);
}

async function getServerVersion() {
  const { rows } = await query("SHOW server_version;");

  return rows[0].server_version;
}

export default {
  getConnectionsMax,
  getConnectionsOpened,
  getServerVersion,
  query,
};

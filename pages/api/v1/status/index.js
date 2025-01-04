import database from "infra/database";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const maxConnections = await database.getConnectionsMax();
  const openedConnections = await database.getConnectionsOpened(
    process.env.POSTGRES_DB,
  );
  const serverVersion = await database.getServerVersion();

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        max_connections: maxConnections,
        opened_connections: openedConnections,
        version: serverVersion,
      },
    },
  });
}

export default status;

describe("API Status", () => {
  let response;
  let responseBody;

  beforeAll(async () => {
    response = await fetch("http://localhost:3000/api/v1/status");
    responseBody = await response.json();
  });

  it("GET /api/v1/status should return 200", () => {
    expect(response.status).toBe(200);
  });

  it("GET /api/v1/status response body should include updated_at", () => {
    expect(responseBody.updated_at).toBeDefined();

    const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
    expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
  });

  it("GET /api/v1/status response body should include database.max_connections", () => {
    expect(responseBody.dependencies.database.max_connections).toBe(100);
  });

  it("GET /api/v1/status response body should include database.opened_connections", () => {
    expect(responseBody.dependencies.database.opened_connections).toBe(1);
  });

  it("GET /api/v1/status response body should include database.version", () => {
    expect(responseBody.dependencies.database.version).toBe("16.0");
  });
});

import app from "../../app";
import supertest from "supertest";
const api = supertest(app);
describe("testing welcome router", () => {
  test("welcome", async () => {
    const result = await api
    .get("/")
    .expect(200)
    .expect("Content-Type", "text/html; charset=utf-8");
    expect(result.text).toContain('welcome')
  });
});

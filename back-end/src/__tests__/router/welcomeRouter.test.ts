import app from "../../app";
import supertest from "supertest";
const api = supertest(app);
describe("testing welcome router", () => {
  test("welcome", async () => {
    await api
      .get("/")
      .expect(200)
      .expect("Content-Type", "text/html; charset=UTF-8");
    // expect(result.text).toContain('home')
  });
});

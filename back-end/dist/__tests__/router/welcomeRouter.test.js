"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../../app"));
const supertest_1 = __importDefault(require("supertest"));
const api = (0, supertest_1.default)(app_1.default);
describe("testing welcome router", () => {
    test("welcome", async () => {
        await api.get("/").expect(200).expect("Content-Type", "text/html; charset=UTF-8");
        // expect(result.text).toContain('home')
    });
});
//# sourceMappingURL=welcomeRouter.test.js.map
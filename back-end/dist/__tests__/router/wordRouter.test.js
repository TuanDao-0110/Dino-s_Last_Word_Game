"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../../app"));
const supertest_1 = __importDefault(require("supertest"));
const api = (0, supertest_1.default)(app_1.default);
const firebase_1 = __importDefault(require("../../database/firebase"));
const errorType_model_1 = require("../../types/errorType.model");
const helps_1 = require("../helps");
const successMessage_model_1 = require("../../types/successMessage.model");
const { admin } = firebase_1.default;
beforeEach(async () => {
    await admin.database().ref("words").remove();
    await admin.database().ref("words/hard").set(["supperhard"]);
    await admin.database().ref("words/medium").set(["mediumword"]);
    await admin.database().ref("words/easy").set(["easyword"]);
});
describe("testing GET:/api/word/all", () => {
    test("get all status code 200", async () => {
        const result = await api.get("/api/word").expect(200).expect(helps_1.Content_Type, helps_1.Content_ApplicationJson);
        expect(result.body).toHaveProperty("result.hard");
    });
});
describe("testing GET:/api/word/:level", () => {
    const url = "/api/word/";
    test("get status code 400", async () => {
        const result = await api.get(`${url}wronglevel`).expect(400).expect(helps_1.Content_Type, helps_1.Content_Text);
        expect(result.text).toContain(errorType_model_1.Message.Invalid_Level_Select);
    });
    test("get status code 200 with all word in hard", async () => {
        await api.get(`${url}hard`).expect(200).expect(helps_1.Content_Type, helps_1.Content_ApplicationJson);
    });
    test("get status code 200 with all word in medium", async () => {
        await api.get(`${url}medium`).expect(200).expect(helps_1.Content_Type, helps_1.Content_ApplicationJson);
    });
    test("get status code 200 with all word in easy", async () => {
        await api.get(`${url}easy`).expect(200).expect(helps_1.Content_Type, helps_1.Content_ApplicationJson);
    });
});
describe("testing POST:/api/word/", () => {
    const url = "/api/word/";
    test("Status code 400 with invalid new word", async () => {
        const result = await api.post(`${url}`).send({ newword: 4, level: "easy" }).expect(400).expect(helps_1.Content_Type, helps_1.Content_Text);
        expect(result.text).toContain(errorType_model_1.Message.Invalid_New_Word);
    });
    test("Status code 400 with invalid level", async () => {
        const result = await api.post(`${url}`).send({ newword: "newword", level: "eas" }).expect(400).expect(helps_1.Content_Type, helps_1.Content_Text);
        expect(result.text).toContain(errorType_model_1.Message.Invalid_Level_Select);
    });
    test("Status code 200 with  new word vs level", async () => {
        let result = await api.post(`${url}`).send({ newword: "newword", level: "hard" }).expect(201).expect(helps_1.Content_Type, helps_1.Content_ApplicationJson);
        expect(result.body.msg).toContain(successMessage_model_1.SuccessMessage.AddSuccess);
        result = await api.get("/api/word").expect(200).expect(helps_1.Content_Type, helps_1.Content_ApplicationJson);
        expect(result.body.result.hard).toContain('newword');
    });
});
afterAll(async () => {
    await admin.app().delete();
});
//# sourceMappingURL=wordRouter.test.js.map
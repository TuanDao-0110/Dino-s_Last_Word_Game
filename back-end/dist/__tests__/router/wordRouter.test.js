"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield admin.database().ref("words").remove();
    yield admin.database().ref("words/hard").set(["supperhard"]);
    yield admin.database().ref("words/medium").set(["mediumword"]);
    yield admin.database().ref("words/easy").set(["easyword"]);
}));
describe("testing GET:/api/word/all", () => {
    test("get all status code 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield api.get("/api/word").expect(200).expect(helps_1.Content_Type, helps_1.Content_ApplicationJson);
        expect(result.body).toHaveProperty("result.hard");
    }));
});
describe("testing GET:/api/word/:level", () => {
    const url = "/api/word/";
    test("get status code 400", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield api.get(`${url}wronglevel`).expect(400).expect(helps_1.Content_Type, helps_1.Content_Text);
        expect(result.text).toContain(errorType_model_1.Message.Invalid_Level_Select);
    }));
    test("get status code 200 with all word in hard", () => __awaiter(void 0, void 0, void 0, function* () {
        yield api.get(`${url}hard`).expect(200).expect(helps_1.Content_Type, helps_1.Content_ApplicationJson);
    }));
    test("get status code 200 with all word in medium", () => __awaiter(void 0, void 0, void 0, function* () {
        yield api.get(`${url}medium`).expect(200).expect(helps_1.Content_Type, helps_1.Content_ApplicationJson);
    }));
    test("get status code 200 with all word in easy", () => __awaiter(void 0, void 0, void 0, function* () {
        yield api.get(`${url}easy`).expect(200).expect(helps_1.Content_Type, helps_1.Content_ApplicationJson);
    }));
});
describe("testing POST:/api/word/", () => {
    const url = "/api/word/";
    test("Status code 400 with invalid new word", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield api.post(`${url}`).send({ newword: 4, level: "easy" }).expect(400).expect(helps_1.Content_Type, helps_1.Content_Text);
        expect(result.text).toContain(errorType_model_1.Message.Invalid_New_Word);
    }));
    test("Status code 400 with invalid level", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield api.post(`${url}`).send({ newword: "newword", level: "eas" }).expect(400).expect(helps_1.Content_Type, helps_1.Content_Text);
        expect(result.text).toContain(errorType_model_1.Message.Invalid_Level_Select);
    }));
    test("Status code 200 with  new word vs level", () => __awaiter(void 0, void 0, void 0, function* () {
        let result = yield api.post(`${url}`).send({ newword: "newword", level: "hard" }).expect(201).expect(helps_1.Content_Type, helps_1.Content_ApplicationJson);
        expect(result.body.msg).toContain(successMessage_model_1.SuccessMessage.AddSuccess);
        result = yield api.get("/api/word").expect(200).expect(helps_1.Content_Type, helps_1.Content_ApplicationJson);
        expect(result.body.result.hard).toContain('newword');
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield admin.app().delete();
}));

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
const auth_1 = require("firebase/auth");
const app_2 = require("firebase/app");
const successMessage_model_1 = require("../../types/successMessage.model");
const { admin } = firebase_1.default;
const firebaseConfig = {
    apiKey: "AIzaSyA5vvWG6a6k7ULGyunD7IshDOlO5tp-p6Y",
    authDomain: "hangman-e9ef0.firebaseapp.com",
    projectId: "hangman-e9ef0",
    storageBucket: "hangman-e9ef0.appspot.com",
    messagingSenderId: "498942236158",
    appId: "1:498942236158:web:74fbcc73d58ee6326f1caf",
    measurementId: "G-ZG5HRYN2M5",
};
let auth;
beforeAll(() => {
    const application = (0, app_2.initializeApp)(firebaseConfig);
    auth = (0, auth_1.getAuth)(application);
});
describe("testing GET:api/user/", () => {
    test("get token error", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield api.get("/api/user").expect(401).expect(helps_1.Content_Type, helps_1.Content_Text);
        expect(result.text).toContain(errorType_model_1.Message.HeaderMissing);
    }));
});
describe("testing login ", () => {
    let token = "";
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        admin.database().ref('scores').remove();
        const email = "a@gmail.com";
        const password = "123456";
        let userCredential = yield (0, auth_1.signInWithEmailAndPassword)(auth, email, password);
        const user = userCredential.user;
        expect(user.email).toEqual(email);
        token = yield user.getIdToken();
    }));
    test("GET:api/user/ status code 200", () => __awaiter(void 0, void 0, void 0, function* () {
        yield api.get("/api/user").set("Authorization", `Bearer ${token}`).expect(200).expect(helps_1.Content_Type, helps_1.Content_ApplicationJson);
    }));
    test('POST:api/user/ status code 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield api.post("/api/user").set("Authorization", `Bearer ${token}`)
            .send({ score: 4242 })
            .expect(201).expect(helps_1.Content_Type, helps_1.Content_ApplicationJson);
        expect(result.body.msg).toContain(successMessage_model_1.SuccessMessage.AddSuccess);
    }));
    test("POST:api/user/ status code 400 with wrong type data", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield api
            .post("/api/user")
            .set("Authorization", `Bearer ${token}`)
            .send({ score: '4242' })
            .expect(400)
            .expect(helps_1.Content_Type, helps_1.Content_Text);
        expect(result.text).toContain(errorType_model_1.Message.Invalid_Score);
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield admin.app().delete();
}));

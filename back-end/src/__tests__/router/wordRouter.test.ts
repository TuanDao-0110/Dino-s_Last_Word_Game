import app from "../../app";
import supertest from "supertest";
const api = supertest(app);
import firebase from "../../database/firebase";
import { Message } from "../../types/errorType.model";
import { Content_ApplicationJson, Content_Text, Content_Type } from "../helps";
import { SuccessMessage } from "../../types/successMessage.model";
const { admin } = firebase;

beforeEach(async () => {
  await admin.database().ref("words").remove();
  await admin.database().ref("words/hard").set(["supperhard"]);
  await admin.database().ref("words/medium").set(["mediumword"]);
  await admin.database().ref("words/easy").set(["easyword"]);
});

describe("testing GET:/api/word/all", () => {
  test("get all status code 200", async () => {
    const result = await api.get("/api/word").expect(200).expect(Content_Type, Content_ApplicationJson);
    expect(result.body).toHaveProperty("result.hard");
  });
});

describe("testing GET:/api/word/:level", () => {
  const url = "/api/word/";
  test("get status code 400", async () => {
    const result = await api.get(`${url}wronglevel`).expect(400).expect(Content_Type, Content_Text);
    expect(result.text).toContain(Message.Invalid_Level_Select);
  });
  test("get status code 200 with all word in hard", async () => {
    await api.get(`${url}hard`).expect(200).expect(Content_Type, Content_ApplicationJson);
  });
  test("get status code 200 with all word in medium", async () => {
    await api.get(`${url}medium`).expect(200).expect(Content_Type, Content_ApplicationJson);
  });
  test("get status code 200 with all word in easy", async () => {
    await api.get(`${url}easy`).expect(200).expect(Content_Type, Content_ApplicationJson);
  });
});
describe("testing POST:/api/word/", () => {
  const url = "/api/word/";
  test("Status code 400 with invalid new word", async () => {
    const result = await api.post(`${url}`).send({ newword: 4, level: "easy" }).expect(400).expect(Content_Type, Content_Text);
    expect(result.text).toContain(Message.Invalid_New_Word);
  });
  test("Status code 400 with invalid level", async () => {
    const result = await api.post(`${url}`).send({ newword: "newword", level: "eas" }).expect(400).expect(Content_Type, Content_Text);
    expect(result.text).toContain(Message.Invalid_Level_Select);
  });
  test("Status code 200 with  new word vs level", async () => {
    let result = await api.post(`${url}`).send({ newword: "newword", level: "hard" }).expect(201).expect(Content_Type, Content_ApplicationJson);
    expect(result.body.msg).toContain(SuccessMessage.AddSuccess);
     result = await api.get("/api/word").expect(200).expect(Content_Type, Content_ApplicationJson);
     expect(result.body.result.hard).toContain('newword')
  });
});
afterAll(async () => {
  await admin.app().delete();
});

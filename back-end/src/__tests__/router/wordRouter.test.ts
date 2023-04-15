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
  await admin.database().ref("words/animals").set(["animals"]);
  await admin.database().ref("words/countries").set(["countries"]);
  await admin.database().ref("words/fruits").set(["fruits"]);
  await admin.database().ref("words/sports").set(["sports"]);
  await admin.database().ref("words/profession").set(["profession"]);
});

describe("testing GET:/api/word", () => {
  test("get all status code 200", async () => {
    const result = await api
      .get("/api/word")
      .expect(200)
      .expect(Content_Type, Content_ApplicationJson);
    expect(result.body).toHaveProperty("result.animals");
  });
});

describe("testing GET:/api/word/:category", () => {
  const url = "/api/word/";
  test("get status code 400", async () => {
    const result = await api
      .get(`${url}wrongcategory`)
      .expect(400)
      .expect(Content_Type, Content_Text);
    expect(result.text).toContain(Message.Invalid_Category_Select);
  });
  test("get status code 200 with all word in animals", async () => {
    await api
      .get(`${url}animals`)
      .expect(200)
      .expect(Content_Type, Content_ApplicationJson);
  });
  test("get status code 200 with all word in countries", async () => {
    await api
      .get(`${url}countries`)
      .expect(200)
      .expect(Content_Type, Content_ApplicationJson);
  });
  test("get status code 200 with all word in fruits", async () => {
    await api
      .get(`${url}fruits`)
      .expect(200)
      .expect(Content_Type, Content_ApplicationJson);
  });
});
describe("testing POST:/api/word/", () => {
  const url = "/api/word/";
  test("Status code 400 with invalid new word", async () => {
    const result = await api
      .post(`${url}`)
      .send({ newword: 4, category: "wrong" })
      .expect(400)
      .expect(Content_Type, Content_Text);
    expect(result.text).toContain(Message.Invalid_New_Word);
  });
  test("Status code 400 with invalid category", async () => {
    const result = await api
      .post(`${url}`)
      .send({ newword: "newword", category: "eas" })
      .expect(400)
      .expect(Content_Type, Content_Text);
    expect(result.text).toContain(Message.Invalid_Category_Select);
  });
  test("status code 201 once post successful vs code 200 when we get that word", async () => {
    let result = await api
      .post(`${url}`)
      .send({ newword: "testing", category: "sports" })
      .expect(201)
      .expect(Content_Type, Content_ApplicationJson);
    expect(result.body.msg).toContain(SuccessMessage.AddSuccess);
    result = await api
      .get(`${url}`)
      .expect(200)
      .expect(Content_Type, Content_ApplicationJson);
    expect(result.body.result.sports).toContain("testing");
    console.log("RESULT TEST", result.body.result);
  });
});
afterAll(async () => {
  await admin.app().delete();
});

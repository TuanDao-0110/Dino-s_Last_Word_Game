import app from "../../app";
import supertest from "supertest";
const api = supertest(app);
import firebase from "../../database/firebase";
import { Message } from "../../types/errorType.model";
import { Content_ApplicationJson, Content_Text, Content_Type } from "../helps";
import { Auth, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { SuccessMessage } from "../../types/successMessage.model";

const { admin } = firebase;
const firebaseConfig = {
  apiKey: "AIzaSyA5vvWG6a6k7ULGyunD7IshDOlO5tp-p6Y",
  authDomain: "hangman-e9ef0.firebaseapp.com",
  projectId: "hangman-e9ef0",
  storageBucket: "hangman-e9ef0.appspot.com",
  messagingSenderId: "498942236158",
  appId: "1:498942236158:web:74fbcc73d58ee6326f1caf",
  measurementId: "G-ZG5HRYN2M5",
};
let auth: Auth;
beforeAll(() => {
  const application = initializeApp(firebaseConfig);
  auth = getAuth(application);
});

describe("testing GET:api/user/", () => {
  test("get token error", async () => {
    const result = await api.get("/api/user").expect(401).expect(Content_Type, Content_Text);
    expect(result.text).toContain(Message.HeaderMissing);
  });
});

describe("testing login ", () => {
  let token = "";

  beforeAll(async () => {
    admin.database().ref('scores').remove()

    const email = "a@gmail.com";
    const password = "123456";
    let userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    expect(user.email).toEqual(email);
    token = await user.getIdToken();

  });
  test("GET:api/user/ status code 200", async () => {
   await api.get("/api/user").set("Authorization", `Bearer ${token}`).expect(200).expect(Content_Type, Content_ApplicationJson);
  });
  test('POST:api/user/ status code 200',async()=> { 
    const result = await api.post("/api/user").set("Authorization", `Bearer ${token}`)
    .send({score:4242})
    .expect(201).expect(Content_Type, Content_ApplicationJson);
    
    expect (result.body.msg).toContain(SuccessMessage.AddSuccess)
  })
    test("POST:api/user/ status code 400 with wrong type data", async () => {
      const result = await api
        .post("/api/user")
        .set("Authorization", `Bearer ${token}`)
        .send({ score: '4242' })
        .expect(400)
        .expect(Content_Type, Content_Text);

      expect(result.text).toContain(Message.Invalid_Score);
    });
});

afterAll(async () => {
  await admin.app().delete();
});

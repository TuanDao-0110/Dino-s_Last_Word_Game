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
  apiKey: "AIzaSyBM4e4qOYgLuLqBPJoF4alU6a0EqawOJ0g",
  authDomain: "hangman-test-af094.firebaseapp.com",
  databaseURL: "https://hangman-test-af094-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hangman-test-af094",
  storageBucket: "hangman-test-af094.appspot.com",
  messagingSenderId: "83424929113",
  appId: "1:83424929113:web:c3d9fef3d28dfdbd181848",
  measurementId: "G-L1MTNTMW5K",
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

    const email = "test@gmail.com";
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

export enum Name {
  BadRequestError404 = "BadRequestError404",
  BadRequestError400 = "BadRequestError400",
  Auth_Token_Expired = "auth/id-token-expired",
  Auth_Argument_Error = "Auth_Argument_Error",
  Authorization = "Authorization",
}

export enum Message {
  UnknownEndPoint = "Unknown end point",
  ServerBroken = "sever broken",
  HeaderMissing = "Authorization header missing",
  Resource_Not_Found = "Resource not found",
  Invalid_New_Word = "Invalid data type, data should be object with {newword:string,category:string}",
  Invalid_Category_Select = "Invalid categorys",
  Invalid_Score = "Invalid new Score, new score should be object with {score:number}",
  Authorization_Error = "Authorization Error",
}

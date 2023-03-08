"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.Name = void 0;
var Name;
(function (Name) {
    Name["BadRequestError404"] = "BadRequestError404";
    Name["BadRequestError400"] = "BadRequestError400";
    Name["Auth_Token_Expired"] = "auth/id-token-expired";
    Name["Auth_Argument_Error"] = "Auth_Argument_Error";
    Name["Authorization"] = "Authorization";
})(Name = exports.Name || (exports.Name = {}));
var Message;
(function (Message) {
    Message["UnknownEndPoint"] = "Unknown end point";
    Message["ServerBroken"] = "sever broken";
    Message["HeaderMissing"] = "Authorization header missing";
    Message["Resource_Not_Found"] = "Resource not found";
    Message["Invalid_New_Word"] = "Invalid data type, data should be object with {newword:string,level:string}";
    Message["Invalid_Level_Select"] = "Invalid levels, level should be easy/medium/hard";
    Message["Invalid_Score"] = "Invalid new Score, new score should be object with {score:number}";
    Message["Authorization_Error"] = "Authorization Error";
})(Message = exports.Message || (exports.Message = {}));

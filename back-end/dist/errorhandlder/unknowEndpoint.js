"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unknowEndpoint = (_req, response) => {
    return response.status(404).json({ error: "unknown endpoint" });
};
exports.default = unknowEndpoint;

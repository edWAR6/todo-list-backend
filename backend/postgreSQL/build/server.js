"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 8080;
const HOST = '0.0.0.0';
app.get('/', (req, res) => {
    res.send('Well done!');
});
app.listen(PORT, HOST, () => console.log(`✅ The server is up and running on http://${HOST}:${PORT}`));

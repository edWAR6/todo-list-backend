"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var PORT = 8080;
var HOST = '0.0.0.0';
app.get('/', function (req, res) {
    res.send('Well done!');
});
app.listen(PORT, HOST, function () { return console.log("\u2705 The server is up and running on http://" + HOST + ":" + PORT); });

const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 8000;
const jsonFilePath = __dirname + "/comment.json";

app.use(cors());
app.use(express.json()); // Body Parser 설정 추가

function readJson() {
    try {
        const data = fs.readFileSync(jsonFilePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function writeJson(data) {
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), "utf-8");
}

app.get('/', (req, res) => {
    res.send(readJson());
});

app.post('/', (req, res) => {
    const data = req.body;
    console.log(data);

    // 여기서 데이터를 파일에 추가하고 응답을 보내는 로직을 구현해야 합니다.
    // 예를 들면:
    const comments = readJson();
    comments.push(data);
    writeJson(comments);

    res.json({ message: "댓글이 성공적으로 등록되었습니다." });
});

app.listen(port, () => {
    console.log(`${port}에서 실행중`);
});

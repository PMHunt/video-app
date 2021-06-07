const express = require('express');
const fs = require('fs');
const app = express();

if (!process.env.PORT) {
    throw new Error("Please specify the port number with env var PORT");
}
const PORT=process.env.PORT;

app.get('/', (req, res) => {
    res.send('Hello Ninja');
});
app.get('/video', (req, res) => {
    const path = "videos/SampleVideo_1280x720_1mb.mp4";
    fs.stat(path, (err, stats) => {
        if (err) {
            console.error("An error occurred");
            res.sendStatus(500);
            return;
        }
        res.writeHead(200, {
            "Content-Length": stats.size,
            "Content-Type": "video/mp4",
        });
        fs.createReadStream(path).pipe(res);
    });
});
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});

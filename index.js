const express = require("express");
const cors = require('cors');
const path = require("path");
const uuid = require('uuid');
const { ERROR_CODES } = require('./errors');

const app = express();
app.use(cors());
app.use(express.json({ type: "application/json" }));
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname));

app.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/users', (req, res) => {
    const randomNumber = Math.random() * 10;
    if (randomNumber < 5) {
        res.json({
            data: [
                {
                    id: uuid.v4(),
                    firstname: 'Nail',
                    lastname: 'Ismayilov'
                },
                {
                    id: uuid.v4(),
                    firstname: 'Qabil',
                    lastname: 'Qurbanov'
                },
                {
                    id: uuid.v4(),
                    firstname: 'Nargiz',
                    lastname: 'Nusratzade'
                }
            ],
            message: 'OK'
        });
    } else {
        res.status(500).json({
            data: null,
            message: ERROR_CODES.UNEXPECTED_ERROR
        });
    }

});

app.listen(process.env.PORT || 3333, () => {
    console.log(
        `⚡️[server]: Server is running at https://localhost:${process.env.PORT || 3333
        }`
    );
});

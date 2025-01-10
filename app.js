const express = require('express');
const app = express();

app.use(express.json());

let players = [];

app.get("", (req, res) => {
    res.json({
        message: "Welcome to mahjong-scoring-app"
    })
})

// ユーザ登録 -----------------------------------
// id, name, point, scoreをクエリパラメータで指定してリクエスト（nameはフロント側入力, pointとscoreは初期値をフロント側で指定することを想定）
// http://localhost:3000/players?id=1&name=Yuta&point=0&score=25000
app.post("/players", (req, res) => {

    // 登録する新ユーザデータ
    const newUser = {
        id: players.length + 1, 
        name: req.query.name,
        point: 0,
        score: 25000
    };

    // 配列に格納
    players.push(newUser);

    // レスポンス
    res.status(200).json({
        message: "New user was registered.", 
        player: newUser
    });
});

// 全ユーザデータの取得 -----------------------------------
app.get("/players", (req, res) => {
    res.status(200).json({
        "players": players
    });

});

// 任意のユーザデータの取得 -----------------------------------
// ルートパラメータにユーザIDを指定
// http://localhost:3000/players/1
app.get("/players/:id", (req, res) => {
    // URLで指定されたidのプレイヤーデータを取得し, 変数playerに格納
    const player = players.find( p => p.id === parseInt(req.params.id));  // 指定されたidのプレイヤを検索
    if(player) {
        res.json({
            "player": player
        });
    } else {
        res.status(400).json({
            message: "route param was invalid."
        });
    }
});

// 任意のユーザの点数更新 -----------------------------------
// scoreには「フロント側で加算された点数値」をクエリパラメータに指定
// http://localhost:3000/players/1/score?score=33000
app.put("/players/:id/score", (req, res) => {
    const player = players.find( p => p.id === parseInt(req.params.id)); // 指定されたidのプレイヤを検索
    const newScore = req.query.score; // 更新値をクエリから取得
    if(player) {
        player.score = newScore;
        res.json({message: `player${req.params.id} score updated`});
    } else {
        res.status(400).json({
            message: "invalid input"
        });
    }
});

// 任意のユーザのポイント更新 -----------------------------------
// scoreには「フロント側で加算されたポイント値」をクエリパラメータに指定
// http://localhost:3000/players/1/point?point=25
app.put("/players/:id/point", (req, res) => {
    const player = players.find( p => p.id === parseInt(req.params.id)); // 指定されたidのプレイヤを検索
    const newPoint = req.query.point; // 更新値をクエリから取得
    if(player) {
        player.point = newPoint;
        res.json({message: `player${req.params.id} point updated`});
    } else {
        res.status(400).json({
            message: "invalid input"
        });
    }
});

app.delete("/players/:id", (req, res) => {
    const deletePlayerIndex = players.findIndex( p => p.id === parseInt(req.params.id)); // 指定されたidのプレイヤのインデックスを検索
    if(deletePlayerIndex !== -1) {
        var deleted = players.splice(deletePlayerIndex, 1); // splice(開始位置Index, 削除数)
        res.json({
            message: `Deleting Succeeded!`
        });
    } else {
        res.status(400).json({
            message: "invalid id"
        });
    }
})




// サーバ構築
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});
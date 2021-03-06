## API設計の練習とGitの使い方の復習

## URI設計
|メソッド|URI|詳細|
|:----|:----|:----|
|GET|/api/v1/users|ユーザーリストの取得|
|GET|/api/v1/users/101|ユーザー情報の取得|
|POST|/api/v1/users|新規ユーザーの作成|
|PUT|/api/v1/users/101|ユーザー情報の更新|
|DELETE|/api/v1/users/101|ユーザーの削除|
|GET|/api/v1/search?q=ryo|ユーザー検索結果の取得|


## テーブル設計(MySQL)

### users
|フィールド名|データ型|NULL許容|その他|
|:----|:----|:----|:----|
|id|INT|NOT NULL|PRIMARY KEY|
|team_id|INT|
|name|VARCHAR(30)|NOT NULL|


### teams
|フィールド名|データ型|NULL許容|その他|
|:----|:----|:----|:----|
|id|INT|NOT NULL|PRIMARY KEY|
|team_name|VARCHAR(30)|NOT NULL| |
|team_overview|VARCHAR(300)| | |


### membership
|フィールド名|データ型|NULL許容|その他|
|:----|:----|:----|:----|
|id|INT|NOT NULL|PRIMARY KEY|
|user_id|INT|NOT NULL|FOREIGN KEY|
|team_id|INT|NOT NULL|FOREIGN KEY|


### habits
|フィールド名|データ型|NULL許容|その他|
|:----|:----|:----|:----|
|id|INT|NOT NULL|PRIMARY KEY|
|user_id|INT|NOT NULL|FOREIGN KEY|
|habit_title|VARCHAR(30)|NOT NULL| |
|habit_memo|VARCHAR(300)| | |
|bigin_date|DATE|NOT NULL| |
|finish_date|DATE|NOT NULL| |

```
CREATE TABLE users (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    team_id INT,
    name VARCHAR(30) NOT NULL
);

```

```
CREATE TABLE teams (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    team_name VARCHAR(30) NOT NULL,
    team_overview VARCHAR(300)
);

```
```
CREATE TABLE membership (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    team_id INT NOT NULL,
    FOREIGN KEY (user_id) references users(id),
    FOREIGN KEY (team_id) references teams(id)
);

```
```
CREATE TABLE habits (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    habit_title VARCHAR(30) NOT NULL,
    habit_memo VARCHAR(300),
    bigin_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    finish_date DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP + INTERVAL 30 DAY)
);

```
```
INSERT INTO users (name) VALUES ("ryo");
INSERT INTO users (name, team_id) VALUES ("yuta", 1);
INSERT INTO users (name, team_id) VALUES ("kazuyuki", 1);

```
INSERT INTO habits (user_id, habit_title, habit_memo) VALUES (1, "Study", "EVERY DAY");
ALTER TABLE habits CHANGE COLUMN habnit_memo habit_memo VARCHAR(300);

|ステータスコード|メッセージ|説明|
|:----|:----|:----|
|400|必須項目が入力されていません。|必須項目に入力漏れがあるので、登録できない|
|401|認証エラー|ユーザー認証ができていない|
|500|サーバーエラー|サーバー側でエラーが発生している|
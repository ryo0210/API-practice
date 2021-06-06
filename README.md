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

users
|フィールド名|データ型|NULL許容|その他|
|:----|:----|:----|:----|
|id|INT|NOT NULL|PRIMARY KEY|
|team_id|INT| |FOREIGN KEY|
|name|VARCHAR(30)|

habit
|フィールド名|データ型|NULL許容|その他|
|:----|:----|:----|:----|
|id|INT|NOT NULL|PRIMARY KEY|
|user_id|INT|NOT NULL|FOREIGN KEY|
|habit_title|VARCHAR(30)|NOT NULL| |
|habit_memo|VARCHAR(300)| | |
|habit_bigin_date|DATE|NOT NULL| |
|habit_finish_date|DATE|NOT NULL| |


CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY,
    team_id INT,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE habits (
    id INT NOT NULL PRINARY KRY,
    user_id INT NOT NULL FORRIN KRY,
    habit_title VARCHAR(30) 
)


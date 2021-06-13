const indexModules = (() => {
    //検索ボタンをクリックしたときのイベントリスナーを設定
    document.getElementById("search-btn")
    .addEventListener("click", () => {
        return searchModule.searchUsers()
    })
    //UsersモジュールのfetchAllUsersのメソッドを呼び出す。
    return usersModule.fetchAllUsers()
})()
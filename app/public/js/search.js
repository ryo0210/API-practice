//即時関数でモジュール化
const searchModule = (() => {
    const BASE_URL = "http://localhost:3000/api/v1/search"

    return {
        searchUsers: async () => {
            //検索窓の値を取得
            const query = document.getElementById("search").value
            const res = await fetch(BASE_URL + "?q=" + query)
            const result = await res.json()
            let body = ""

            for (let i=0; i<result.length; i++) {
                const user = result[i]
                body += 
                    `<tr>
                        <td>${user.name}</td>
                        <td>${user.team_id}</td>
                    </tr>`
                document.getElementById("users-list").innerHTML = body
            }
            
        }
    }
})()
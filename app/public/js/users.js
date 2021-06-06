//即時関数でモジュール化
const usersModule = (() => {
    const BASE_URL = "http://localhost:3000/api/v1/users"

    return {
        fetchAllUsers: async () => {
            const res = await fetch(BASE_URL)
            const users = await res.json()

            for (let i=0; i<users.length; i++) {
                const user = users[i]
                const body = 
                    `<tr>
                        <td>${user.name}</td>
                        <td>${user.team_id}</td>
                    </tr>`
                document.getElementById("users-list").insertAdjacentHTML("beforeend", body)
            }
            
        }
    }
})()
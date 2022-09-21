
// The index.html file has a form with a search input. When the form is submitted, it should take the value of the input and search GitHub for user matches using the User Search Endpoint.

const form = document.getElementById("github-form")

form.addEventListener("submit", (event) => {
    event.preventDefault()
    event.target[0].value //listens to searchbox via event -->target-->0 index-->value (all kinds of info is in the 0 index, including id, class, etc.)

    fetch(`https://api.github.com/search/users?q=${event.target[0].value}`) //gets data from the form
    .then(resp => resp.json())
    .then(resp => {

        const userList = document.querySelector("#user-list") //takes out old stuff before putting new stuff in
        const reposList = document.getElementById("repos-list")
        userList.innerHTML = ""
        reposList.innerHTML = ""

        resp.items.map(item => {

            const li = document.createElement("li")

            const h2 = document.createElement("h2")
            h2.textContent = item.login

            h2.addEventListener("click", e=> showUserRepos(item.login, e))
    
            const a = document.createElement('a')
            a.href = item.html_url //maybe just item.url?
            a.innerText = `Click Here to visit ${event.target[0].value}'s Profile`
                    
            const img = document.createElement("img")
            img.src = item.avatar_url

            
            li.append(h2, img, a)
            userList.append(li)
    

        })
        event.target[0].value = ""
    })
    
 
})
 
function showUserRepos(username, e) {
    e.preventDefault()
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(resp => resp.json())
    .then(resp => resp.map(repo => {
        const li = document.createElement("li")
        const h1 = document.createElement("h1")
        h1.textContent = repo.name
        const reposList = document.getElementById("repos-list")
        li.append(h1)
        reposList.append(li)
    }))
    
}


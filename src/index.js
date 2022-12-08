document.addEventListener("DOMContentLoaded", ()=> {

    fetch("http://localhost:3000/pups")
    .then(response => response.json())
    .then(loadPups)

    document.querySelector("#good-dog-filter").addEventListener("click", event=> {
        if(event.target.textContent === "Filter good dogs: OFF") {
            document.querySelectorAll(".goodDog_false").forEach(span => {
                span.style.display = "none"
            })
            event.target.textContent = "Filter good dogs: ON"
        } else{
            document.querySelectorAll(".goodDog_false").forEach(span => {
                span.style.display = "inherit"
            })
            event.target.textContent = "Filter good dogs: OFF"
        }
    })
})

function loadPups(pups) {
    let img =  document.createElement("img")
    let h2 = document.createElement("h2")
    let button = document.createElement("button")
    button.style.display = "none"
    let info = document.querySelector("#dog-info")
    info.appendChild(img)
    info.appendChild(h2)
    info.appendChild(button)
    
    pups.map(pup => {
        loadPup(pup, img, h2, button)
    })
}

function loadPup(pup, img, h2, button) {
    let dogBar = document.querySelector("#dog-bar")
    let span = document.createElement("span")
    span.classList.add("goodDog_"+pup.isGoodDog)
    span.textContent = pup.name

    span.addEventListener("click", event=> {
        img.src = pup.image
        h2.textContent = pup.name
        button.textContent = pup.isGoodDog ? "Good Dog!" : "Bad Dog!"
        button.style.display = "inherit"

        button.addEventListener("click", event=> {
            fetch(`http://localhost:3000/pups/${pup.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        isGoodDog: event.target.textContent === "Good Dog!" ? false : true
                    })
                }
            )
            .then(response => response.json())
            .then(update => {
                event.target.textContent = update.isGoodDog ? "Good Dog!" : "Bad Dog!"
            })
        })
    })
    dogBar.appendChild(span)
}
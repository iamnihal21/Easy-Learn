let navlinks = document.getElementsByClassName("navlinks")

let check = document.getElementById("check")

for (let i = 0; i < navlinks.length; i++) {
    navlinks[i].addEventListener("click", () => {
        check.checked = false
    })
}
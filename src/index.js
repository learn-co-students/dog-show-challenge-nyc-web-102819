document.addEventListener('DOMContentLoaded', () => {
    let table = document.querySelector('#table-body')
    let form = document.getElementById('dog-form')
    fetch('http://localhost:3000/dogs').then(function (j) {return j.json()}).then(function (o) {
        o.forEach(function (dog) {
            let newRow = document.createElement('tr')
            newRow.innerHTML = `<td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button>Edit</button></td>`
            let editButton = newRow.querySelector('button')
            editButton.dataset.id = `${dog.id}`
            editButton.addEventListener("click", function(e) {
                let infoNode = e.target.parentNode.parentNode
                // debugger
                form[0].value = infoNode.querySelectorAll('td')[0].innerText
                form[1].value = infoNode.querySelectorAll('td')[1].innerText
                form[2].value = infoNode.querySelectorAll('td')[2].innerText
                form.dataset.id = `${dog.id}`
            })
            // debugger
            table.appendChild(newRow)
        })
    })
    form.addEventListener("submit", function (e) {
        e.preventDefault()
        let targetedDog = table.querySelector(`button[data-id="${form.dataset.id}"]`)
        let dogRow = targetedDog.parentNode.parentNode.querySelectorAll('td')
        dogRow[0].innerText = `${form[0].value}`
        dogRow[1].innerText = `${form[1].value}`
        dogRow[2].innerText = `${form[2].value}`
        fetch(`http://localhost:3000/dogs/${form.dataset.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                accepts: "application/json"
            },
            body: JSON.stringify({
                name: `${form[0].value}`,
                breed: `${form[1].value}`,
                sex: `${form[2].value}`
            })
        }).then(function (e) {table.innerHTML=''}).then(function (e) {
            fetch('http://localhost:3000/dogs').then(function (j) {return j.json()}).then(function (o) {
            o.forEach(function (dog) {
            let newRow = document.createElement('tr')
            newRow.innerHTML = `<td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button>Edit</button></td>`
            let editButton = newRow.querySelector('button')
            editButton.dataset.id = `${dog.id}`
            editButton.addEventListener("click", function(e) {
                let infoNode = e.target.parentNode.parentNode
                // debugger
                form[0].value = infoNode.querySelectorAll('td')[0].innerText
                form[1].value = infoNode.querySelectorAll('td')[1].innerText
                form[2].value = infoNode.querySelectorAll('td')[2].innerText
                form.dataset.id = `${dog.id}`
            })
            // debugger
            table.appendChild(newRow)
        })
    })
        })
        
    })
})
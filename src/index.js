const url = 'http://localhost:3000/dogs'

//  fetching all dogs
function fetchAllDogs() {
  fetch(url).then(resp => resp.json())
    .then(function(dogs) {
      dogs.forEach(function(dog) {
        renderDogs(dog) 
      })
    })
}

//  rendering dogs
function renderDogs(dog) {

  const tbody = document.querySelector('#table-body')
  let row = document.createElement("tr")
  row.setAttribute("class", "padding")
  row.setAttribute("id", `${dog.id}`)
      
  let name = document.createElement("td")
  name.innerHTML = `${dog.name}`
  name.setAttribute("class", "padding center name")
  row.appendChild(name)

  let breed = document.createElement("td")
  breed.innerHTML = `${dog.breed}`
  breed.setAttribute("class", "padding center breed")
  row.appendChild(breed)

  let sex = document.createElement("td")
  sex.innerHTML = `${dog.sex}`
  sex.setAttribute("class", "padding center sex")
  row.appendChild(sex)

  let button = document.createElement("button")
  button.innerHTML = "Edit Dog"
  button.setAttribute("class", "padding center")
  button.setAttribute("onclick", "editDog(parentNode)")
  row.appendChild(button)
  
  tbody.appendChild(row);
}

//  editing a dog
function editDog(dogRow) {
  let dogId = dogRow.id
  let dogName = dogRow.querySelector('.name').innerHTML
  let dogBreed = dogRow.querySelector('.breed').innerHTML
  let dogSex = dogRow.querySelector('.sex').innerHTML

  const editForm = document.querySelector("#dog-form")
  editForm.elements[3].setAttribute("onclick", `updateDog(event, ${dogId})`)

  editForm.elements[0].value = dogName
  editForm.elements[1].value = dogBreed
  editForm.elements[2].value = dogSex
}

//  updating a dog
function updateDog(event, dogId) {
  event.preventDefault()
  const editForm = document.querySelector("#dog-form")

  fetch(`${url}/${dogId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: `${event.target.parentNode.elements[0].value}`,
      breed: `${event.target.parentNode.elements[1].value}`,
      sex: `${event.target.parentNode.elements[2].value}`
    })  
  })

  let tr = document.getElementById(`${dogId}`)
  tr.querySelector('.name').innerHTML = `${event.target.parentNode.elements[0].value}`
  tr.querySelector('.breed').innerHTML = `${event.target.parentNode.elements[1].value}`
  tr.querySelector('.sex').innerHTML = `${event.target.parentNode.elements[2].value}`

  editForm.reset()
}

document.addEventListener('DOMContentLoaded', () => {
  fetchAllDogs()

})
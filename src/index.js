document.addEventListener('DOMContentLoaded', () => {
    
    function fetchDogs() {
        fetch('http://localhost:3000/dogs')
        .then(resp => resp.json())
        .then(dogs => createDogsDom(dogs))
    };
    fetchDogs();
    
    function createDogsDom(dogs) {
        dogs.forEach(function (dog) {
            tBody.innerHTML += 
            `<tr>
            <td data-name-id=${dog.id}>${dog.name}</td> 
            <td data-breed-id=${dog.id}>${dog.breed}</td> 
            <td data-sex-id=${dog.id}>${dog.sex}</td> 
            <td><center><button data-dog-id=${dog.id}>Edit</button></center></td>
            </tr>`
        });
    };
    
    const tBody = document.querySelector('#table-body');
    const editForm = document.querySelector(`#dog-form`);
    
    tBody.addEventListener('click', function (e) {
        let dogName = document.querySelector(`td[data-name-id="${e.target.dataset.dogId}"]`).textContent;
        let dogBreed = document.querySelector(`td[data-breed-id="${e.target.dataset.dogId}"]`).textContent;
        let dogSex = document.querySelector(`td[data-sex-id="${e.target.dataset.dogId}"]`).textContent;
        if (e.target.innerText === 'Edit') {
            editForm.name.value = dogName;
            editForm.breed.value = dogBreed;
            editForm.sex.value = dogSex;
            editForm.dataset.dogId = e.target.dataset.dogId;
        }
    });

    editForm.addEventListener('submit', function (e) {
        e.preventDefault();
        let dogId = editForm.dataset.dogId;
        let dogObjName = e.target.name.value;
        let dogObjBreed = e.target.breed.value;
        let dogObjSex = e.target.sex.value;
        let dogObj = { id: dogId, name: dogObjName, sex: dogObjSex };
        patchDogs(dogId, dogObj);
    });

    function patchDogs(dogId, dogObj) {
        fetch(`http://localhost:3000/dogs/${dogId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(dogObj)
        })
        location.reload();
    };

})

/* On page load, render a list of already registered dogs in the table. 
You can fetch these dogs from http://localhost:3000/dogs √

The dog should be put on the table as a table row. The HTML might look something 
like this:√
*/

/*
DOG OBJECT:
{
    "id": 1,
    "name": "Baby",
    "breed": "Scottish Deerhound",
    "sex": "male"
  }
*/

/* Make a dog editable. Clicking on the edit button next to a dog should populate 
the top form with that dog's current information. √ */

/* On submit of the form, a PATCH request should be made to 
http://localhost:3000/dogs/:id to update the dog information 
(including name, breed and sex attributes). √ */

/* Once the form is submitted, the table should reflect the updated dog information. 
There are many ways to do this. You could search for the table fields you need to 
edit and update each of them in turn, but we suggest making a new get request for all 
dogs and rerendering all of them in the table. Make sure this GET happens after the 
PATCH so you can get the most up-to-date dog information. √ */
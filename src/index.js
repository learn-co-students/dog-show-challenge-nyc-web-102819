document.addEventListener('DOMContentLoaded', () => {


    let dogsTable = document.getElementById("table-body")
    let editDogForm = document.getElementById('dog-form')

    //fetch the dogs and then render them to the table
    function getAllDogs () {
        fetch ('http://localhost:3000/dogs')
            .then (function (resp) {
                return resp.json();
            })
            .then (function (dogs) {
                dogs.forEach (function (dog) {
                    let dogRow = document.createElement('tr')
                    dogRow.dataset.id = `${dog.id}`
                    dogRow.innerHTML = `
                    <tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button>Edit</button></td></tr>
                    `
                    dogsTable.appendChild(dogRow)
                })
            })
    }

    getAllDogs();

    dogsTable.addEventListener("click", function (e) {
        if (e.target.tagName = "BUTTON") {
            parentDogRow = e.target.parentNode.parentNode

            //call the function to render dog info to the edit form
            renderDogToEdit(e, parentDogRow);

             //listen for a submit of the form
            editDogForm.addEventListener("submit", function (e) {
            e.preventDefault();
            editDog(e, parentDogRow);
            })

            //function to edit the dog in the table, and submit the fetch patch request
            function editDog(e, parentDogRow) {

            //get the values from the submitted form 
            let newName = (e.target[0].value)
            let newBreed = (e.target[1].value)
            let newSex = (e.target[2].value)
            
            // OPTIMISTICALLY update the parent Dog Row with the new info
            parentDogRow.innerHTML = `
            <tr><td>${newName}</td> <td>${newBreed}</td> <td>${newSex}</td> <td><button>Edit</button></td></tr>
            `

            //then, submit the patch request to update the DB
            dogIdForEdit = parentDogRow.dataset.id
            fetch (`http://localhost:3000/dogs/${dogIdForEdit}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json', 
                    'Accept': 'application/json'
                },
                body: JSON.stringify ({
                    name: newName,
                    breed: newBreed,
                    sex: newSex
                })
            })
            }
        }
    })

    function renderDogToEdit(e, parentDogRow) {
        let dogNameToEdit = parentDogRow.getElementsByTagName('td')[0].innerText
        let dogBreedToEdit = parentDogRow.getElementsByTagName('td')[1].innerText
        let dogSexToEdit = parentDogRow.getElementsByTagName('td')[2].innerText

        editDogForm.innerHTML = `
        <input type="text" name="name" placeholder="dog's name" value="${dogNameToEdit}" />
        <input type="text" name="breed" placeholder="dog's breed" value="${dogBreedToEdit}" />
        <input type="text" name="sex" placeholder="dog's sex" value="${dogSexToEdit}" />
        <input type="submit" value="Submit" />
        `
    }

    // //listen for a submit of the form
    // editDogForm.addEventListener("submit", function (e) {
    //     e.preventDefault();
    //     editDog(e);
    // })

    // function editDog(e) {

    //     //get the values from the submitted form 
    //     let newName = (e.target[0].value)
    //     let newBreed = (e.target[1].value)
    //     let newSex = (e.target[2].value)
        
    //     //find the TR to update


    //     //optimistically update the TR first
        


    //     //then, submit the patch request to update the DB
    // }











})
document.addEventListener('DOMContentLoaded', () => {
    
    const editForm = document.getElementsByTagName("form")[0]
    const table = document.getElementsByTagName("table")[0]

    function getDogs(){
        fetch("http://localhost:3000/dogs")
            .then(function(response){
            return response.json()})
            .then(function(dogs){
                dogs.forEach(function(dog){
                    appendDog(dog)
                })
            })

    }


    function appendDog(dog){
        const tr = document.createElement("TR")

        tr.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td>
            <button data-id = ${dog.id}>Edit</button>
        </td>
        `
        table.appendChild(tr)
    }

    let form = {
        name : "",
        breed : "",
        sex : "",
        id: ""
    }
    
    table.addEventListener("click", function(e){


        if (e.target.innerText === "Edit"){
            form.name = e.target.parentNode.parentNode.children[0].innerText
            form.breed = e.target.parentNode.parentNode.children[1].innerText
            form.sex = e.target.parentNode.parentNode.children[2].innerText
            
            editForm[0].value = form.name
            editForm[1].value = form.breed
            editForm[2].value = form.sex
            form.id = e.target.dataset.id

        }

    })

    

    editForm.addEventListener("submit", function(e){
        e.preventDefault()

        form.name = e.target[0].value
        form.breed = e.target[1].value
        form.sex = e.target[2].value

        // ^ form is now updated

        fetch(`http://localhost:3000/dogs/${form.id}`,{
            method: "PATCH",
            body: JSON.stringify({
                name: editForm.name.value,
                breed: editForm.breed.value,
                sex: editForm.sex.value
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(function(response){return response.json()})
        .then(function(dog){appendDog(dog)})


        // editForm.reset()
        location.reload()
    })



    getDogs()


})
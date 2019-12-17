document.addEventListener('DOMContentLoaded', () => {

    const dogsUrl = "http://localhost:3000/dogs"
    

    let table = document.getElementById('table-body')

    function getDogs() {
        while(table.firstChild){table.firstChild.remove()}
        fetch(dogsUrl)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            // console.log(data[0].breed)
            // console.log(data[0].name)
            // console.log(data[0].sex)

            data.forEach(dog => {
                
                let newRow = document.createElement('tr')
                newRow.dataset.id = dog.id
                newRow.dataset.class = "dog"
                newRow.innerHTML = `
                <td>${dog.name}</td> 
                <td>${dog.breed}</td> 
                <td>${dog.sex}</td> 
                <td><button>Edit Dog</button></td>
                `
                table.appendChild(newRow)
            })
            console.log("getDogs worked")
        })
    }

    getDogs()

    let form = document.getElementById("dog-form")
    
    let editDogId = null
    
    // console.log("before click", editDogId)

    document.addEventListener("click", e => {

        // console.dir(e.target.parentNode.parentNode)
        
        if (e.target.innerText === "Edit Dog") {
            
            // console.log("button click")
            // console.log(e.target.parentNode.parentNode.cells[0].innerText)
            // console.log(e.target.parentNode.parentNode.cells[1].innerText)
            // console.log(e.target.parentNode.parentNode.cells[2].innerText)
         
            form[0].value = e.target.parentNode.parentNode.cells[0].innerText
            form[1].value = e.target.parentNode.parentNode.cells[1].innerText
            form[2].value = e.target.parentNode.parentNode.cells[2].innerText
            
            editDogId = e.target.parentNode.parentNode.dataset.id
            // console.log("after click", editDogId)
        }
    })

    form.addEventListener("submit", e=> {
        e.preventDefault()
        console.log(e.target[0].value)
        console.log(e.target[1].value)
        console.log(e.target[2].value)

        fetch(`${dogsUrl}/${editDogId}`,{
            method: "PATCH",
            headers: {
                "Application": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify ({
                name: e.target[0].value,
                breed: e.target[1].value,
                sex: e.target[2].value
            })
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            getDogs()
            form.reset()
        })
    })


    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //end of master listener

})


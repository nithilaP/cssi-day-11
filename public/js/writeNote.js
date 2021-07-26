window.onload = () => { //When the window is completely finished loading, go ahead and the run the code inside of the function
    firebase.auth().onAuthStateChanged(user => {
        if (user){ //"if" statement does conversion from user object to boolean and checks to see if the user is null (javascript - truthy vs falsy concept)
            //this code runs if the user is logged in
            console.log("logged in as", user.displayName)
            googleUser = user; //makes the code remember the user
        } else {
            //this code runs if the user is not logged in
            console.log("not logged in")
        }
    })

    const createNoteButton = document.querySelector ("#createNoteButton");
    createNoteButton.addEventListener("click", () => {
        //Get values out of the form
        const noteTitle = document.querySelector("#noteTitle").noteValue
        const noteText = document.querySelector("#noteText").noteValue
        console.log(noteTitle, noteText)

        //Write these values to the database
        firebase.database().ref('/users/${googleUser.uid}').push({ //Google User used from created variable above - ask about local variables and scopes for GoogleUser
            title: noteTitle,
            text: noteText
        }).then(() => {
            console.log ("database write successful")
            document.querySelector("#noteTitle").value = ""
            document.querySelector("#noteText").value = ""
        })
        .catch(error => {
            console.log("error writing new note: ", error)
        })

    }
}

//Event listener vs on click = better to stick to one and use it consistently in the code
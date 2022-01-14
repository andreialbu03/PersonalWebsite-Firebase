const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link')

navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    })
})

// Get data
const contactFrom = document.querySelector(".contact-me-form");
const fullName = document.querySelector("#name");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const success = document.querySelector("#success");
const errorNodes = document.querySelectorAll(".error");

// Validate data
function validateForm() {

    clearMessages();
    let errorFlag = false;

    if (fullName.value.length < 1) {
        errorNodes[0].innerText = "Name cannot be blank";
        fullName.classList.add("error-border");
        errorFlag = true;
    }

    if (!validEmail(email.value)) {
        errorNodes[1].innerText = "Invalid email address";
        email.classList.add("error-border")
        errorFlag = true;
    }

    if (message.value.length < 1) {
        errorNodes[2].innerText = "Name cannot be blank";
        message.classList.add("error-border");
        errorFlag = true;
    }

    if (!errorFlag) {
        success.innerText = "Thanks for your message!";
        db.collection("contact-form").doc().set({
            fullName: fullName.value,
            email: email.value,
            message: message.value
        })
        .then(() => {
            console.log("Document successfully written!");
            contactFrom.reset();
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    }
}

// Clear error / success messages
function clearMessages() {
    for (let i=0; i < errorNodes.length; i ++) {
        errorNodes[i].innerText = "";
    }

    success.innerText = "";
    fullName.classList.remove("error-border");
    email.classList.remove("error-border");
    message.classList.remove("error-border");
}

// Check if email is valid
function validEmail(email) {
    let pattern = /\S+@\S+\.\S+/;
    return pattern.test(email)
}
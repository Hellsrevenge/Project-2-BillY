$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $(".signUp");
  var user_nameInput = $("input#user_name-input");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("click", function(event) {
    event.preventDefault();
    var userData = {
      user_name: user_nameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.user_name || !userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.user_name, userData.email, userData.password);
    user_nameInput.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(user_name, email, password) {
    console.log(user_name, email, password)
    $.post("/api/signup", {
      user_name: user_name,
      email: email,
      password: password
    }).then(function(data) {
      window.location.href = "/login";
      // If there's an error, handle it by throwing up a boostrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});

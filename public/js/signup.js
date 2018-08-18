function checkPasswordMatch() {
  var password = $("#password-input").val();
  var confirmPassword = $("#repassword-input").val();

  if (password !== confirmPassword) {
    {
      $("#divCheckPasswordMatch").html("Passwords do not match!");
    }
  } else {
    $("#divCheckPasswordMatch").html("Passwords match.");
  }
}
$(document).ready(function() {
  $("#password-input, #repassword-input").keyup(checkPasswordMatch);
  // Getting references to form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var confirmPassword = $("input#repassword-input");

  // When the signup button is clicked, validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
    confirmPassword.val("");
  });

  // post to the signup route. If succesful, redirected to the members page
  // Otherwise log any errors
  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
    })
      .then(function(data) {
        window.location.replace(data);
        // If there's an error, handle it by throwing up a boostrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});

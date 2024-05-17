//forms
let changePasswordForm = $("#changePasswordForm");
let notificationForm = $("#notificationForm");
let consentForm = $("#consentForm");

//fields
let username = document.getElementById('username');
let new_password = document.getElementById('new_password');
let old_password = document.getElementById('old_password');
let confirm_password = document.getElementById('confirm_password');

let registered_mobile = document.getElementById('registered_mobile');
let registered_email = document.getElementById('registered_email');
let sms_alert = document.getElementById('sms_alert');
let email_alert = document.getElementById('email_alert');

let consent_box = document.getElementById('consent_box');

//patterns
let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
let phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/im;

// error messages
let emptyUsername = "Please enter your username";
let invalidUsername = "Please enter valid username";
let passwordNotMatch = "New password & confirm new password does not match, Kindly try again with correct password.";
let wrongPassword =  "Oops ! Seems like you have entered an incorrect old password. Kindly try again with correct password.";
let emptyOldPassword = "Please enter your old password";
let emptyNewPassword = "Please enter your new password";
let emptyConfirmPassword = "Please re-enter your new password";
let emptyMobile = "Please enter your registered mobile number";
let emptyEmail = "Please enter your registered email address";
let invalidEmail = "Please enter valid email address";
let invalidMobile = "Please enter valid mobile number";

// show/hide password
$(".show-password").each(function(){
    $(this).parent().find("input").css("padding-right", "60px");
});
$(".show-password").each(function(){
    $(this).show();
    $(this).click(function(){
        $(this).hide("fast");
        $(this).parent().find(".hide-password").show("fast");
        $(this).parent().find("input").attr("type", "text");
    });
});
$(".hide-password").each(function(){
    $(this).click(function(){
        $(this).hide("fast");
        $(this).parent().find(".show-password").show("fast");
        $(this).parent().find("input").attr("type", "password");
    });
});

// validate empty fields
function validateEmptyFields(input_field){
    if (input_field.value != ''){
        $(input_field).css({"background": "#F9F9F9", "color": "#707070"});
    }else{
        $(input_field).css({"background": "#ffffff", "color": "#acacac"});
    }
}

//Show error
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-group error';
    const inputMessage = formControl.querySelector('.message');
    inputMessage.innerText = message;
    $(inputMessage).show("medium");
}

//show success
function showSucces(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-group success';
    const inputMessage = formControl.querySelector('.message');
    $(inputMessage).hide("medium");
}

// check valid email
function emailValidation(input, errorMessage) {
  $targetField = input.field;
  $errorDivId = input.field.id;
  if ($targetField.value.match(emailPattern)) {
    $("#" + $errorDivId ).next().hide("medium");
    showSucces($targetField);
    return true;
  } else {
    $("#" + $errorDivId ).next().show("medium");
    showError($targetField, errorMessage);
    return false;
  }
}

// check valid phone
function phoneValidation(input) {
    $errorDivId = input.field.id;
    if (registered_mobile.value.match(phonePattern)) {
      $("#" + $errorDivId ).next().hide("medium");
      showSucces(registered_mobile);
      return true;
    } else {
      $("#" + $errorDivId ).next().show("medium");
      showError(registered_mobile, invalidMobile);
      return false;
    }
  }
  
  //only numbers
  function onlyNumbers(numberField){
    $(numberField).keypress(function (e) {
      if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
       return false;
     }
    });
  }
  onlyNumbers(registered_mobile);

  function checkEmpty(input){
    if($(input).val() !== ''){
      $(input).parent().find(".message").hide("medium");
    }else{
      $(input).parent().find(".message").show("medium");
    }
  }

// password
  function comparePasswords(){
    var old_pw = $(new_password).val();
    var new_pw = $(confirm_password).val();

    if (old_pw == new_pw) {
        showSucces(confirm_password);
    }else{
        showError(confirm_password, passwordNotMatch);
    }
  }
  $(new_password).on("keyup", function () {
    checkEmpty(this);
    //comparePasswords();
    if(confirm_password.value != ''){
      comparePasswords();
    }
  });
  $(confirm_password).on("keyup", function () {
    comparePasswords();
  });

//check for errors
function validateForm(input){
    $errorDivId = input.field.id;
    // check for required fields
    if(input.field.value.trim() === ''){
      showError(input.field, input.message);
      $("#" + $errorDivId ).next().show("medium");
    }else {
        showSucces(input.field);
        $("#" + $errorDivId ).next().hide("medium");
        //check validations
        let inputId = input.field.id;
        if (inputId === "registered_mobile"){
          phoneValidation(input);
        }
        else if(inputId === "username"){
          emailValidation(input, invalidUsername);
        }
        else if(inputId === "registered_email"){
          emailValidation(input, invalidEmail);
        }
        else{}
    }
  }

//validate fields
function checkValidations(inputArr, formElement){
    let formId = '#'+formElement[0].id;
    inputArr.forEach(function(input){
        validateForm(input);
          input.field.addEventListener("change", function(){
            validateForm(input);
          });
      });
        // check for the errors
        let totalErrors = $('.form-group.error').length;
        /* console.log("total errors:", totalErrors); */
        if(!(totalErrors > 0)){
          $(formId).find(".message-box.success").show("medium");
        }
}

//keyup
$('input').on("keyup change", function(){
    validateEmptyFields(this);
});

// change password form submit
$(changePasswordForm).submit(function( cpf_event ) {
    cpf_event.preventDefault();

    let formElement = changePasswordForm;


    checkValidations([ {"field":username, "message":emptyUsername},{"field":old_password, "message":emptyOldPassword},{"field":new_password, "message":emptyNewPassword}, {"field":confirm_password, "message":emptyConfirmPassword} ], formElement);

});

// notification form submit
$(notificationForm).submit(function( nf_event ) {
    nf_event.preventDefault();

    let formElement = notificationForm;

    checkValidations([ {"field":registered_mobile, "message":emptyMobile},{"field":registered_email, "message":emptyEmail} ], formElement);
});

//check consent
function checkConsent(consentBox, formElement){
  let formId = '#'+formElement[0].id;
}
//refresh score
function refreshScore(score, parentContainer){
  refreshPopupHide();
  if(parentContainer){
    let currentScore = $(parentContainer).find('.cibil-score').text();

    $(parentContainer).find('.cibil-score').text(score);

    refreshPoints(currentScore, score, parentContainer);
  }else{
    $('.simulator').find('.cibil-score').text(score);
  }
  updateScore(score, parentContainer);

}
// consent form submit
$(consent_box).change(function() {
  if(this.checked) {
    $(this).parents(consentForm).find('button[type=submit]').removeClass('disabled');
    $(this).parents(consentForm).find('button[type=submit]').prop("disabled", false);
  }else{
    $(this).parents(consentForm).find('button[type=submit]').addClass('disabled');
    $(this).parents(consentForm).find('button[type=submit]').prop("disabled", true);
  }
});

$(consentForm).submit(function( nf_event ) {
  nf_event.preventDefault();
  refreshScore(730, '.simulator'); //you can pass your updated score value here
  document.getElementById("consentForm").reset();
  $(this).find('button[type=submit]').addClass('disabled');
  $(this).find('button[type=submit]').prop("disabled", true);
});
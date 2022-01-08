<?php

$errors = "";

// Name
if (empty($_POST["cname"])) {
    $errors = "Name is required ";
} else {
    $name = $_POST["cname"];
}

// Email
if (empty($_POST["cemail"])) {
    $errors .= "Email is required ";
} else {
    $email = $_POST["cemail"];
}

// Subject
if (empty($_POST["csubject"])) {
    $errors = "Subject is required ";
} else {
    $subject = $_POST["csubject"];
}

// Message
if (empty($_POST["cmessage"])) {
    $errors .= "Message is required ";
} else {
    $message = $_POST["cmessage"];
}

// Form validation
if(!empty($name) && !empty($email) && !empty($subject) && !empty($message)){

    // reCAPTCHA validation
    if(isset($_POST['g-recaptcha-response']) && !empty($_POST['g-recaptcha-response'])) {

        // Google secret API
        $secretAPIkey = getenv("reCaptchaAPIkey");

        // reCAPTCHA response verification
        $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$secretAPIkey.'&response='.$_POST['g-recaptcha-response']);

        // Decode JSON data
        $response = json_decode($verifyResponse);
        if($response->success){
            // Email recipient
            $toMail = "ricardo@riosr.com";

            // Prepare email body text
            $Body = "";
            $Body .= "Name: ";
            $Body .= $name;
            $Body .= "\n";
            $Body .= "Email: ";
            $Body .= $email;
            $Body .= "\n";
            $Body .= "Message: ";
            $Body .= $message;
            $Body .= "\n";

            // Send email
            $success = mail($toMail, $subject, $Body, "From:"."contact@riosr.com");

            // Redirect to success page
            if ($success && $errors == ""){
                echo 'success';
            }
            else{
                echo $errors;
            }
        } else {
            $response = array(
                "status" => "alert-danger",
                "message" => "Robot verification failed, please try again."
            );
            echo implode(", ", $response);
        }       
    } else{ 
        $response = array(
            "status" => "alert-danger",
            "message" => "Plese check on the reCAPTCHA box."
        );
        echo implode(", ", $response);
    } 
}  else{ 
    $response = array(
        "status" => "alert-danger",
        "message" => "All the fields are required."
    );
    echo implode(", ", $response);
}

?>
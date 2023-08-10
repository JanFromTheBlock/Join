<?php
$redirect = './lostpass.html?key=success'; // parameter übergeben


switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case ("POST"): //Send the email;
        header("Access-Control-Allow-Origin: *");

        $mailAddress = $_POST['mail'];
        $subject = "Password reset JOIN624";
        $headers = "From:  noreply@developerakademie.com";
        $message = "Lieber User, \n \n du bekommst diese Mail weil du den Passwort-Reset angefordert hast. Folge diesem Link, der führt dich auf die Seite zum Reseten des Passworts: \n https://gruppe-624.developerakademie.net/resetpass.html?mail=$mailAddress";

        $result = mail($mailAddress, $subject, $message, $headers);
        header("Location: " . $redirect); 

        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}

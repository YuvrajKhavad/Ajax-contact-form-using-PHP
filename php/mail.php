<?php
include 'functions.php';
if (!empty($_POST))
{
  $data['success'] = true;
  $_POST  = multiDimensionalArrayMap('cleanEvilTags', $_POST);
  $_POST  = multiDimensionalArrayMap('cleanData', $_POST);

  //your email adress
  $emailTo ="info@zindex.co.in"; //"yourmail@yoursite.com";

  //from email adress
  $emailFrom ="no-replay@zindex.co.in"; //"contact@yoursite.com";

  //email subject
  $emailSubject = "Mail from Z Index Solutions Website";

  $name = $_POST["name"];
  $email = $_POST["email"];
  $location = $_POST["location"];
  $contact = $_POST['number'];
  $comment = $_POST["comment"];

  if($name == "")
  $data['success'] = false;

  if (!preg_match("/^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z][0-9a-zA-Z-]+\.)+[a-zA-Z]{2,6}$/i", $email))
  $data['success'] = false;


  if($comment == "")
  $data['success'] = false;

  if($data['success'] == true)
  {
    $message = "Hello Team Z Index Solutions,<br> Listed below are new message<br><br>";

    $message .= '<table style="font-family: arial, sans-serif;  border-collapse: collapse;">';

    $message .= '<tr style="background-color: #dddddd;">';
    $message .= '<td style="padding: 8px; font-weight:bold;">Name: </td>';
    $message .= '<td style="padding: 8px;">'.$name.'</td>';
    $message .= '</tr>';

    $message .= '<tr>';
    $message .= '<td style="padding: 8px; font-weight:bold;">Email Address: </td>';
    $message .= '<td style="padding: 8px;">'.$email.'</td>';
    $message .= '</tr>';

    if($location)
    {
      $message .= '<tr style="background-color: #dddddd;">';
      $message .= '<td style="padding: 8px; font-weight:bold;">Location: </td>';
      $message .= '<td style="padding: 8px;">'.$location.'</td>';
      $message .= '</tr>';
    }

    $style = ($location)?' ':' style="background-color: #dddddd;"';
    $style2 = ($location)?' style="background-color: #dddddd;"':' ';

    $message .= '<tr'.$style.'>';
    $message .= '<td style="padding: 8px; font-weight:bold;">Phone: </td>';
    $message .= '<td style="padding: 8px;">'.$contact.'</td>';
    $message .= '</tr>';

    $message .= '<tr'.$style2.'>';
    $message .= '<td style="padding: 8px; font-weight:bold;">Requirement Details: </td>';
    $message .= '<td style="padding: 8px;">'.$comment.'</td>';
    $message .= '</tr>';

    $message .= '</table>';

    $message .= '<br/><br/> Thank You.';

    $headers = "MIME-Version: 1.0" . "\r\n"; 
    $headers .= "Content-type:text/html; charset=utf-8" . "\r\n";
    $headers .= "From: Z Index Solutions <$emailFrom>" . "\r\n";
    mail($emailTo, $emailSubject, $message, $headers);

    $data['success'] = true;
    echo json_encode($data);
  }
}
?>
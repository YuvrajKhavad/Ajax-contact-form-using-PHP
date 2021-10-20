<?php
include 'functions.php';
if (!empty($_POST))
{
  $data['success'] = true;
  $_POST  = multiDimensionalArrayMap('cleanEvilTags', $_POST);
  $_POST  = multiDimensionalArrayMap('cleanData', $_POST);

  //your email adress
  $emailTo ="drcoders1@gmail.com";

  //from email adress
  $emailFrom ="no-replay@drcoders.com";

  $company_name = " Dr Coders";
  $main_color = "#FFD005";
  $second_color="#ffffff";
  $form_data = $_POST['form_data'];
  foreach($form_data as $f_data)
  {
      ${$f_data['name']} = $f_data['value'];
  }

  //email subject
  $emailSubject = "Get in touch details on ".$company_name." from ".$your_name;

  if(empty($form_data))
  {
    $data['success'] = false;
  }

  if($data['success'] == 1)
  {
    $message = "<p>Hello Team ".$company_name.",<br> Listed below are new message<br><br></p>";

    $message .= '<div style="max-width: 700px; font-size:small;">';
    $message .= '<table style="max-width: 700px; font-size:small; font-family: arial,sans-serif; border-collapse: collapse; width: 100%; border: 2px solid '.$main_color.';">';

    $message .= '<thead>
                    <tr>
                      <th colspan="2"><p style="border-bottom: 2px solid '.$main_color.'; color: '.$main_color.'; text-align: center; padding: 15px 0; margin:0;">Contact Details</p></th>
                    </tr>
                 </thead>';

    $message .= '<tbody style="font-family:Roboto,RobotoDraft,Helvetica,Arial,sans-serif;">'; 

    $i = 0;
    foreach($form_data as $f_data)
    {
      $name = str_replace('_', ' ',$f_data['name']);
      $name = ucwords($name);
      if($i%2==0)
      {
          $message .= '<tr style="background-color: '.$main_color.'; color: '.$second_color.';">';
          $message .= '<td style="width:150px; border-right: 1px solid '.$second_color.'; padding: 8px;"><b>'. $name.'</b></td>';
          $message .= '<td style="padding: 8px;">'.$f_data['value'].'</td>';
          $message .= '</tr>';
      }
      else
      {
          $message .= '<tr style="background-color: '.$second_color.'; color: '.$main_color.';">';
          $message .= '<td style="width:150px; border-right: 1px solid '.$main_color.'; padding: 8px;"><b>'. $name.'</b></td>';
          $message .= '<td style="padding: 8px;">'.$f_data['value'].'</td>';
          $message .= '</tr>';
      }
       $i++;
    }
    $message .= '</tbody>';
    $message .= '<tfoot>
                    <tr>
                      <th colspan="2"><p style="border-top: 2px solid '.$main_color.'; color: '.$main_color.'; text-align: center; padding: 15px 0; margin:0;">Thank You. <br> </p></th>
                    </tr>
                 </tfoot>';

    $message .= '</table>';
    $message .= '</div>';

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html; charset=utf-8" . "\r\n";
    $headers .= "From: ".$company_name." <$emailFrom>" . "\r\n";
    $mailsent = mail($emailTo, $emailSubject, $message, $headers);

    $data['success'] = true;
    //$data['mailstatus'] = $mailsent;
    echo json_encode($data);
  }
}
?>
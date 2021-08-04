<?php
include 'functions.php';
if (!empty($_POST))
{
  $data['success'] = true;
  $_POST  = multiDimensionalArrayMap('cleanEvilTags', $_POST);
  $_POST  = multiDimensionalArrayMap('cleanData', $_POST);

  //your email adress
  $emailTo ="drcoders1@gmail.com"; //"yourmail@yoursite.com";

  //from email adress
  $emailFrom ="no-replay@zindex.co.in"; //"contact@yoursite.com";

  $company_name = " Z Index Solutions";
  $main_color = "#ff0000";
  $second_color="#ffffff";

  //email subject
  $emailSubject = "Mail from '".$company_name."' Website";

  $form_data = $_POST['form_data'];
  if(empty($form_data))
  {
    $data['success'] = false;
  }
  

  if($data['success'] == true)
  {
    $message = "<p>Hello Team '".$company_name."',<br> Listed below are new message<br><br></p>";

    $message .= '<div style="max-width: 700px; font-size:small;">';
    $message .= '<table style="max-width: 700px; font-size:small; font-family: arial,sans-serif; border-collapse: collapse; width: 100%;">';

    $message .= '<thead>
                    <tr>
                      <th colspan="2"><p style="border: 2px solid '.$main_color.'; color: '.$main_color.'; text-align: center; padding: 5px 0;">Contact Details</p></th>
                    </tr>
                 </thead>';

    
    $message .= '<tbody style="font-family:Roboto,RobotoDraft,Helvetica,Arial,sans-serif">';  

    $i = 0;
    foreach($form_data as $f_data)
    {
      
      $name = str_replace('_', ' ',$f_data['name']);
      $name = ucwords($name);
      if($i%2==0)
      {
          $message .= '<tr style="background-color: '.$main_color.'; color: '.$second_color.';">';
          $message .= '<td style="width:150px; border-right: 1px solid #fff; padding: 8px;"><b>'. $name.'</b></td>';
          $message .= '<td style="padding: 8px;">'.$f_data['value'].'</td>';
          $message .= '</tr>';
      }
      else
      {
          $message .= '<tr style="background-color: '.$second_color.'; color: '.$main_color.';">';
          $message .= '<td style="width:150px; border-right: 1px solid #FF6600; padding: 8px;"><b>'. $name.'</b></td>';
          $message .= '<td style="padding: 8px;">'.$f_data['value'].'</td>';
          $message .= '</tr>';
      }
       $i++;
    }

    $message .= '</tbody>';
    $message .= '</table>';
    $message .= '</div>';
    
    $message .= '<tfoot>
                    <tr>
                      <th colspan="2"><p style="border: 2px solid '.$main_color.'; color: '.$main_color.'; text-align: center; padding: 5px 0;">Thank You. <br> </p></th>
                    </tr>
                 </tfoot>';
    //$message .= '<br/><br/> Thank You.';

    $headers = "MIME-Version: 1.0" . "\r\n"; 
    $headers .= "Content-type:text/html; charset=utf-8" . "\r\n";
    $headers .= "From: '".$company_name."' <$emailFrom>" . "\r\n";
    mail($emailTo, $emailSubject, $message, $headers);

    $data['success'] = true;
    echo json_encode($data);
  }
}
?>
<?php
if( isset($_POST) ){
   
  //form validation vars
  $formok = true;
  $errors = array();
   
  //sumbission data
  $ipaddress = $_SERVER['REMOTE_ADDR'];
  $date = date('d/m/Y');
  $time = date('H:i:s');
   
  //form data
  $name = $_POST['name'];    
  $email = $_POST['email'];
  $subject = $_POST['subject'];
  $message = $_POST['message'];

  // Validate $name is not empty
  if(empty($name)){
    $formok = false;
    $errors[] = "You have not entered a name";
  }
  
  //validate email address is not empty
  if(empty($email)){
    $formok = false;
    $errors[] = "You have not entered an email address";

  //validate email address is valid
  }elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)){
    $formok = false;
    $errors[] = "You have not entered a valid email address";
  }

  //validate subject is not empty
  if(empty($subject)){
    $formok = false;
    $errors[] = "You have not entered a subject";
  }

  //validate message is not empty
  if(empty($message)){
    $formok = false;
    $errors[] = "You have not entered a message";
  }

  if($formok){

      // "From" email header
      $headers = "From: contact@wcvd.me<script type="text/javascript">
  /* <![CDATA[ */
  (function(){try{var s,a,i,j,r,c,l,b=document.getElementsByTagName("script");l=b[b.length-1].previousSibling;a=l.getAttribute('data-cfemail');if(a){s='';r=parseInt(a.substr(0,2),16);for(j=2;a.length-j;j+=2){c=parseInt(a.substr(j,2),16)^r;s+=String.fromCharCode(c);}s=document.createTextNode(s);l.parentNode.replaceChild(s,l);}}catch(e){}})();
  /* ]]> */
  </script>" . "\r\n";

      // Specifies content type and charset in email header
      $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
      
      // Builds the email body 
      $emailbody = "<p><strong>Name: </strong> {$name} </p>
                    <p><strong>Email Address: </strong> {$email} </p>
                    <p><strong>Subject: </strong> {$subject} </p>
                    <p><strong>Message: </strong> {$message} </p>
                    <p>This message was sent from the IP Address: {$ipaddress} on {$date} at {$time}</p>";
      
      // Specifies recipient mailing address 
      mail("wcvandal@gmail.com<script type="text/javascript">
  /* <![CDATA[ */
  (function(){try{var s,a,i,j,r,c,l,b=document.getElementsByTagName("script");l=b[b.length-1].previousSibling;a=l.getAttribute('data-cfemail');if(a){s='';r=parseInt(a.substr(0,2),16);for(j=2;a.length-j;j+=2){c=parseInt(a.substr(j,2),16)^r;s+=String.fromCharCode(c);}s=document.createTextNode(s);l.parentNode.replaceChild(s,l);}}catch(e){}})();
  /* ]]> */
  </script>","New Portfolio Message",$emailbody,$headers);
  }

  //what we need to return back to our form
  $returndata = array(
    'posted_form_data' => array(
        'name' => $name,
        'email' => $email,
        'subject' => $subject,
        'message' => $message
    ),
    'form_ok' => $formok,
    'errors' => $errors
  );

  //if this is not an ajax request
  if(empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest'){
       
    //set session variables
    session_start();
    $_SESSION['cf_returndata'] = $returndata;
     
    //redirect back to form
    header('location: ' . $_SERVER['HTTP_REFERER']);
   
  }
}
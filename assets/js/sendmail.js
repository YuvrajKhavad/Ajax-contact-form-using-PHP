$(document).ready(function()
{
	$('.sendmail').click(function()
	{
		var name =  $('#name').val();
		var email =  $('#email').val().toLowerCase();
		var location = $('#location').val();
		var number =  $('#number').val();
		var comment = $('#comment').val();
		var error = false;

		if(name == "")
		{
			$("#name").addClass("error");
			$(".name").remove();
			$("#name").after('<p class="error name">Please enter name</p>');
			$('#errorSend').removeClass('hide');
			error = true;
		}

		if(email == "")
		{
			$("#email").addClass("error");
			$(".email" ).remove();
			$("#email").after('<p class="error email">Please enter email address</p>');
			$('#errorSend').removeClass('hide');
			error = true;
		}
		else if(!validateEmail(email))
		{
			$("#email").addClass("error");
			$(".email" ).remove();
			$("#email").after('<p class="error email">Your email address is invalid. Please enter a valid address.</p>');
			$('#errorSend').removeClass('hide');
			error = true;
		}
		else
		{
			$( ".email" ).remove();
		}

		if (number == "")
		{
			$("#number").addClass("error");
			$(".number").remove();
			$("#number").after('<p class="error number">Please enter number</p>');
			$('#errorSend').removeClass('hide');
			error = true;
		}
		else if(!validatePhone(number))
		{
			$("#number").addClass("error");
			$(".number" ).remove();
			$("#number").after('<p class="error number">Your phone number is invalid. Please enter a valid phone number.</p>');
			$('#errorSend').removeClass('hide');
			error = true;
		}
		else
		{
			$( ".number" ).remove();
		}

		if(comment == "")
		{
			$("#comment").addClass("error");
			$(".comment").remove();
			$("#comment").after('<p class="error comment">Please enter comment</p>');
			$("#errorSend").removeClass('hide');
			error = true;
		}

		if (error == false)
		{
			var dataString = $('#contact-form').serialize(); // Collect data from form
            $.ajax({
                type: "POST",
                url: $('#contact-form').attr('action'),
                data: dataString,
                timeout: 6000,
                error: function (request, error)
                {

                },
                success: function (response)
                {
					alert(response);
                    response = $.parseJSON(response);
                    if (response.success)
					{
						//alert(response.success);
						$('#successSend').removeClass('hide');
						//$("#contact-form")[0].reset();
                        $("#name").val('');
                        $("#email").val('');
                        $("#location").val('');
                        $("#number").val('');
                        $('#comment').val('');

                        setTimeout(function()
		                {
		                	$('#successSend').addClass('hide');

		                }, 3000);
                    }
					else
					{
						$('#errorSend').removeClass('invisible');
                    }
                }
            });
            return false;
        }
        else
        {
        	setTimeout(function()
            {
            	$('#errorSend').addClass('hide');

            	var ids = ["name", "email", "number", "comment"];
            	$.grep( ids, function( n, i )
            	{
					$( "."+n ).remove();
					$("#"+n ).removeClass('error');
				});

            }, 5000);
        	return false;
        }

	});

	$('#name,#email,#number,#comment').keyup(function()
	{
		var cid =  $(this).attr('id');
		$( "."+cid ).remove();
		$('#errorSend').addClass('hide');
		$("#"+cid ).removeClass('error');
	});

	function validateEmail($email)
	{
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		return emailReg.test( $email );
	}

	function validatePhone($number)
	{
		var phoneReg = /^\(?(\d{3})\)?[-\. ]?(\d{3})[-\. ]?(\d{4})$/;
		return phoneReg.test( $number );
	}
});
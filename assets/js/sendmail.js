$(document).ready(function()
{
	$('.sendmail').click(function()
	{
		var name =  $('#name').val();
		var email =  $('#email').val().toLowerCase();
		var number =  $('#number').val();
		var location = $('#location').val();
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
		if(comment == "")
		{
			$("#comment").addClass("error");
			$(".comment").remove();
			$("#comment").after('<p class="error comment">Please enter comment</p>');
			$("#errorSend").removeClass('hide');
			error = true;
		}		
		if (number == "") 
		{
			$("#number").addClass("error");
			$(".number").remove();
			$("#number").after('<p class="error number">Please enter number</p>');
			$('#errorSend').removeClass('hide');
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
	
	$(".fancybox").fancybox({
		openEffect	: 'fade',
		closeEffect	: 'fade'
	});
});

/*
function getTimeRemaining(endtime) 
{
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor((t / 1000) % 60);
	var minutes = Math.floor((t / 1000 / 60) % 60);
	var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	var days = Math.floor(t / (1000 * 60 * 60 * 24));
	return {
		'total': t,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	};
}function initializeClock(id, endtime) 
{
	var clock = document.getElementById(id);
	var daysSpan = clock.querySelector('.days');
	var hoursSpan = clock.querySelector('.hours');
	var minutesSpan = clock.querySelector('.minutes');
	var secondsSpan = clock.querySelector('.seconds');

	function updateClock() 
	{
		var t = getTimeRemaining('3/05/2017');
		daysSpan.innerHTML = t.days;
		hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
		minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
		secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

		if (t.total <= 0)
		{
			clearInterval(timeinterval);
		}
	}

	updateClock();
	var timeinterval = setInterval(updateClock, 1000);
}
var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
initializeClock('clockdiv', deadline);*/
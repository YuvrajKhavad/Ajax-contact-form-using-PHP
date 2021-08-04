$(document).ready(function()
{
    var submit_btn =  $(".sendmail");

	$("#contact-form").validate({
		rules: {
            'name':{
            	required: true
            },
            'email':{
            	required: true,
                email: true
            },
            'number':{
            	required: true,
                number: true
            },
            'comment': {
                required: true,
            },

        },
        messages:{
            'name' : "Please enter name.",
            'email' :{
                required: "Please enter email address",
                email: "Your email address is invalid. Please enter a valid address.",
            },
            'number': {
				required: "Please enter number",
                number: "Your phone number is invalid. Please enter a valid phone number.",
			},
            'comment':{
                required: "Please enter comment",
            },

        },

        submitHandler: function(form)
        {
            submit_btn.prop('disabled', true); // disable submit button 
			var dataString = $('#contact-form').serializeArray(); // Collect data from form
            $.ajax({
                type: "POST",
                url: $('#contact-form').attr('action'),
                data: {form_data : dataString},
                timeout: 6000,
                success: function (response)
                {
                    response = $.parseJSON(response);
                    if (response.success)
					{
						$('#successSend').removeClass('hide');
						$("#contact-form")[0].reset();

                        setTimeout(function()
		                {
		                	$('#successSend').addClass('hide');

	 	                }, 3000);
                     }
	 				 else
	 				 {
	 				 	$('#errorSend').removeClass('invisible');
                    }
                    submit_btn.prop('disabled', false); // unable submit button 
                 }
             });
        }
	});

});
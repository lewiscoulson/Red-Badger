(function(){

	var $form    = $( "form" ),
		$mars    = $(".mars"),
		$results = $(".results");

	$mars.hide();
	$results.hide();

	$form.on( "click", "button", function(e){
		e.preventDefault();

		var $output   = $(".output"),
			gridInput = $form.find( "#grid" ).val().split(''),
			position1 = $form.find( "#position-1" ).val().split(''),
			input1    = $form.find( "#input-1" ).val(),
			position2 = $form.find( "#position-2" ).val().split(''),
			input2    = $form.find( "#input-2" ).val(),
			position3 = $form.find( "#position-3" ).val().split(''),
			input3    = $form.find( "#input-3" ).val();

		var mars = new APP.Mars( gridInput[0], gridInput[1], 50, $(".mars") );
		mars.init();

		$form.slideUp(500, function(){
			$(".mars").slideDown(500, function(){
				var martianRobot1 = new APP.MartianRobot( position1[0], position1[1], position1[2], input1 );
				martianRobot1.init();
				$output.append( "<li>Martian Robot 1 - " + martianRobot1.showOutput() + "</li>" );

				var martianRobot2 = new APP.MartianRobot( position2[0], position2[1], position2[2], input2 );
				martianRobot2.init();
				$output.append( "<li>Martian Robot 2 - " + martianRobot2.showOutput() + "</li>" );

		    	var martianRobot3 = new APP.MartianRobot( position3[0], position3[1], position3[2], input3 );
				martianRobot3.init();
				$output.append( "<li>Martian Robot 3 - " + martianRobot3.showOutput() + "</li>" );

				setTimeout(function(){
					$(".mars").slideUp(500,function(){
						$(".results").slideDown(500);
					});
				}, 2500);
			});
		});  
	});

}());





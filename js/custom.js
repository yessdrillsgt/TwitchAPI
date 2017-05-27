$(document).ready(function(){
	// Adds the active class to the element on hover
	$('.header').on('mouseenter', function(){
		$(this).addClass('active');
		$(this).removeClass('inactive');
	});
	
	// Remove the active class from the element on exit 
	// if there is at least one other element that is currently active
	$('.header').on('mouseleave', function(){
		
		if ($('.active').length > 1){
			$(this).removeClass('active');
			$(this).addClass('inactive');
		}
	});
	
	// Adds the active class to the element on click
	$('.header').on('click', function(){
		$('.header').removeClass('active').addClass('inactive'); // Removes active class from all elements and adds inactive class to them
		
		$(this).removeClass('inactive').addClass('active'); // Adds active class to the element that was clicked on
		
		// Show and hide records based on the header element that was clicked
		var selectedElement = $(this).attr('id')
		switch(selectedElement){
			case 'headerAll':
				
				break;
			case 'headerOnline':
				
				break;
			case 'headerOffline':
				
				break;
		}
	});
	
	$(function(){
		var twitchUsers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
		var onlineStatus;
		var statusImage;
		var streamURL;
		var logoURL;
		var offlineRecords = [];
		
		
		for (var i = 0; i < twitchUsers.length; i++){
			
			$.ajax( {
				url: ' https://wind-bow.gomix.me/twitch-api/streams/' + twitchUsers[i] + '?callback=?',
				dataType: 'json',
				type: 'GET',
				async: false,
				success: function(data) {
					alert('inside ajax');
					console.log('stream');
					console.log(data);
					
					if (data.stream !== null) {
						logoURL = data.stream.channel.logo;
						onlineStatus = data.stream.channel.status;
						statusImage = 'img/glyphicons-52-eye-open.png';
						streamURL = data.stream.channel.url;
						
						AppendDiv(logoURL, onlineStatus, statusImage, streamURL, data.stream.channel.display_name); 
					
					} else {
						offlineRecords.push(twitchUsers[i]);
						//AddOfflineRecord( twitchUsers[i] );
					}
				}
			});
		}
		alert('outside ajax');
		console.log('offlineRecords');
		console.log(offlineRecords);
		if (offlineRecords.length > 0){
			for (var i = 0; i < offlineRecords.length; i++){
				AddOfflineRecord (offlineRecords[i]);
			}
		}
	});
	
	function AddOfflineRecord(twitchUser){
		alert(twitchUser);
		$.ajax( {
			url: ' https://wind-bow.gomix.me/twitch-api/channels/' + twitchUser + '?callback=?',
			dataType: 'json',
			type: 'POST',
			async: false,
			success: function(data) {
				logoURL = data.logo;
				onlineStatus = '';
				statusImage  = 'img/glyphicons-53-eye-close.png';
				streamURL = data.url;
				
				console.log('channel');
				console.log(data);
				
				AppendDiv(logoURL, onlineStatus, statusImage, streamURL, data.channel.display_name); 
			}
		});
	};
	
	function AppendDiv(logoURL, onlineStatus, statusImage, streamURL, twitchUser){
		var record = 	'<div class="row userRecord"> ' +
							'<div class="col-xs-4 text-center"><img id="userProfilePic" class="img-rounded img-responsive" src="' + logoURL + '" alt="Twitch profile pic"></div> ' +
							'<div class="col-xs-4"><a target="_blank" id="userTwitchPage" href="' + streamURL + '"><span id="userName">' + twitchUser + '</span></a> ' +
								'<div id="onlineInfo">' + onlineStatus + '</div> ' +
							'</div> ' +
							'<div class="col-xs-4 text-center"><img id="userStatus" src="' + statusImage + '" alt="Status Image"></div> ' +
						'</div> '

		$('.container').append(record);	
	};
	
});
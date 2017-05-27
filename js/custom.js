$(document).ready(function(){
	// Declare global variables
	const ONLINE = 'online';
	const OFFLINE = 'offline';
	
	
	$(function(){
		var twitchUsers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
		var onlineStatus;
		var statusImage;
		var streamURL;
		var logoURL;
		
		for (var i = 0; i < twitchUsers.length; i++){
			AddOnlineRecord(twitchUsers[i]);
		}
		
		
		function AddOnlineRecord(twitchUser){
			$.ajax( {
				url: ' https://wind-bow.gomix.me/twitch-api/streams/' + twitchUsers[i] + '?callback=?',
				dataType: 'json',
				type: 'GET',
				success: function(data) {
					/* console.log('stream');
					console.log(data); */
					
					if (data.stream !== null) {
						logoURL = data.stream.channel.logo;
						onlineStatus = data.stream.channel.status;
						statusImage = 'img/glyphicons-52-eye-open.png';
						streamURL = data.stream.channel.url;
						
						AppendDiv(logoURL, onlineStatus, statusImage, streamURL, data.stream.channel.display_name, true); 
					
					} else {
						AddOfflineRecord(twitchUser);
					}
				}
			});
		}; // End of AddOnlineRecord
		
		
		function AddOfflineRecord(twitchUser){
			$.ajax( {
				url: ' https://wind-bow.gomix.me/twitch-api/channels/' + twitchUser + '?callback=?',
				dataType: 'json',
				type: 'GET',
				success: function(data) {
					if(data.logo !== null){
						logoURL = data.logo;
					} else {
						logoURL = 'img/404_user_70x70.png';
					}
					
					onlineStatus = '';
					statusImage  = 'img/glyphicons-53-eye-close.png';
					streamURL = data.url;
					
					/* console.log('channel');
					console.log(data); */
					
					AppendDiv(logoURL, onlineStatus, statusImage, streamURL, data.display_name, false); 
				}
			});
		}; // End of AddOfflineRecord
	});
	
	
	function AppendDiv(logoURL, onlineStatus, statusImage, streamURL, twitchUser, online){
		var classStatus;
		
		if (online){
			classStatus = ONLINE;
		} else {
			classStatus = OFFLINE;
		}
		
		var record = 	'<div class="row userRecord ' + classStatus + '"> ' +
							'<div class="col-xs-4 text-center"><img id="userProfilePic" class="img-rounded img-responsive" src="' + logoURL + '" alt="Twitch profile pic"></div> ' +
							'<div class="col-xs-4"><a target="_blank" id="userTwitchPage" href="' + streamURL + '"><span id="userName">' + twitchUser + '</span></a> ' +
								'<div id="onlineInfo">' + onlineStatus + '</div> ' +
							'</div> ' +
							'<div class="col-xs-4 text-center"><img id="userStatus" src="' + statusImage + '" alt="Status Image"></div> ' +
						'</div> '

		$('.container').append(record);	
	};
	
	
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
				$('.' + ONLINE).show();
				$('.' + OFFLINE).show();
				
				break;
			case 'headerOnline':
				$('.' + ONLINE).show();
				$('.' + OFFLINE).hide();
				
				break;
			case 'headerOffline':
				$('.' + ONLINE).hide();
				$('.' + OFFLINE).show();
				
				break;
		}
	});
});
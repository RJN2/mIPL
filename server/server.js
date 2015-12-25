Meteor.publish('thePlayers', function(){
	var currentUserId = this.userId;
	return PlayersList.find({createdBy: currentUserId});
});

Meteor.methods({
	'insertPlayerData': function(playerNameVar, playerScoreVar){
		var currentUserId = Meteor.userId();
		PlayersList.insert({
			name: playerNameVar,
			score: playerScoreVar,
			createdBy: currentUserId
		});
	},
	'removePlayerData': function(selectedPlayer){
		var currentUserId = Meteor.userId();
		PlayersList.remove({_id: selectedPlayer, createdBy: currentUserId});
	},
	'modifyPlayerScore': function(selectedPlayer, scoreValue){
		var currentUserId = Meteor.userId();
		PlayersList.update( {_id: selectedPlayer, createdBy: currentUserId},
							{$inc: {score: scoreValue} });
	}
});
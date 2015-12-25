PlayersList = new Mongo.Collection('players');

if (Meteor.isClient) {
	
	Meteor.subscribe('thePlayers');

	Template.ipl_table.helpers({
		'player': function(){
			return PlayersList.find({}, {sort: {score: -1, name: 1} });
		},
		'playerCount': function(){
			return PlayersList.find().count();
		},
		'selectedClass': function(){
			var playerID = this._id;
			var selectedPlayer = Session.get('selectedPlayer');
			if (playerID == selectedPlayer) {
				return "selected";
			}
		},
		showSelectedPlayer: function(){
			var selectedPlayer = Session.get('selectedPlayer');
			return PlayersList.findOne(selectedPlayer);
		}
	});

	Template.ipl_table.events({
		'click .player': function(){
			var playerID = this._id;
			Session.set('selectedPlayer', playerID);
		},
		'click .increment': function(){
			var selectedPlayer = Session.get('selectedPlayer');
			Meteor.call('modifyPlayerScore', selectedPlayer, 5);
		},
		'click .decrement': function(){
			var selectedPlayer = Session.get('selectedPlayer');
			Meteor.call('modifyPlayerScore', selectedPlayer, -5);
		},
		'click .remove': function(){
			var selectedPlayer = Session.get('selectedPlayer');
			if (confirm("Remove?")) {
				Meteor.call('removePlayerData', selectedPlayer);
			}
		}
	});

	Template.addPlayerForm.events({
		'submit form': function(event){
			event.preventDefault();
			var playerNameVar = event.target.playerName.value;
			var playerScoreVar = Number(event.target.playerScore.value);
			Meteor.call('insertPlayerData', playerNameVar, playerScoreVar);
			event.target.playerName.value = "";
			event.target.playerScore.value = null;
		}
	});
}

if (Meteor.isServer) {
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
}

PlayersList = new Mongo.Collection('players');

if (Meteor.isClient) {
	console.log("Hello client");
	Template.ipl_table.helpers({
		'player': function(){
			var currentUserId = Meteor.userId();
			console.log(currentUserId);
			return PlayersList.find({createdBy: currentUserId},
									{sort: {score: -1, name: 1} });
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
			PlayersList.update(selectedPlayer, {$inc: {score: 5}});
		},
		'click .decrement': function(){
			var selectedPlayer = Session.get('selectedPlayer');
			PlayersList.update(selectedPlayer, {$inc: {score: -5}});
		},
		'click .remove': function(){
			var selectedPlayer = Session.get('selectedPlayer');
			if (confirm("Remove?")) {
				PlayersList.remove(selectedPlayer);
			}
		}
	});

	Template.addPlayerForm.events({
		'submit form': function(event){
			event.preventDefault();
			var playerNameVar = event.target.playerName.value;
			var playerScoreVar = Number(event.target.playerScore.value);
			var currentUserId = Meteor.userId();
			PlayersList.insert({
				name: playerNameVar,
				score: playerScoreVar,
				createdBy: currentUserId
			});
			console.log(playerScoreVar);
			event.target.playerName.value = "";
			event.target.playerScore.value = null;
		}
	});
}

if (Meteor.isServer) {
	console.log("Hello server");
	console.log(PlayersList.find().fetch());
}

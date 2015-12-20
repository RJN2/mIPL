PlayersList = new Mongo.Collection('players');

if (Meteor.isClient) {
	console.log("Hello client");
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
			PlayersList.update(selectedPlayer, {$inc: {score: 5}});
		},
		'click .decrement': function(){
			var selectedPlayer = Session.get('selectedPlayer');
			PlayersList.update(selectedPlayer, {$inc: {score: -5}});
		}
	});

	Template.addPlayerForm.events({
		'submit form': function(event){
			event.preventDefault();
			var playerNameVar = event.target.playerName.value;
			PlayersList.insert({
				name: playerNameVar,
				score: 0
			});
		}
	});
}

if (Meteor.isServer) {
	console.log("Hello server");
}

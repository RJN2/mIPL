PlayersList = new Mongo.Collection('players');

if (Meteor.isClient) {
	console.log("Hello client");
	Template.ipl_table.helpers({
		'player': function(){
			return PlayersList.find()
		},
		'playerCount': function(){
			return PlayersList.find().count()
		},
		'selectedClass': function(){
			var playerID = this._id;
			var selectedPlayer = Session.get('selectedPlayer');
			if (playerID == selectedPlayer) {
				return "selected"
			}
		}
	});

	Template.ipl_table.events({
		'click .player': function(){
			var playerID = this._id;
			Session.set('selectedPlayer', playerID);
		}
	});
}

if (Meteor.isServer) {
	console.log("Hello server");
}

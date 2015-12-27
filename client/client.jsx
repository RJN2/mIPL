Meteor.subscribe('thePlayers');

Meteor.startup(function () {
	// Use Meteor.startup to render the component after the page is ready
	React.render(<App />, document.getElementById("render-target"));
});



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
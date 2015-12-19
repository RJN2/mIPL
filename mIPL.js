PlayersList = new Mongo.Collection('players');

if (Meteor.isClient) {
  console.log("Hello client");
  Template.ipl_table.helpers({
    'player': function(){
      return PlayersList.find();
    },
    'playerCount': function(){
      return PlayersList.find().count();
    }
  });

  Template.ipl_table.events({
    'click .player': function(){
      console.log("clicked");
    },
    'mouseover .player': function(){
      console.log("mouseover");
    }
  });
}

if (Meteor.isServer) {
  console.log("Hello server");
}

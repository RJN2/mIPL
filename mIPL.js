PlayersList = new Mongo.Collection('players');

console.log("hello world");

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
}

if (Meteor.isServer) {
  console.log("Hello server");
}
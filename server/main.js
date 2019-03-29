import { Meteor } from 'meteor/meteor';

import { Mongo } from 'meteor/mongo';
export const Notes = new Mongo.Collection("notes");

import { Accounts } from 'meteor/accounts-base';

import { check } from 'meteor/check';
Meteor.methods({
  'notes.insert'(text){
    check(text, String);

    //Check if user is logged in
    if(!Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }

    Notes.insert({
      text,
      ceratedAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },

  'notes.remove'(note){
    check(note._id, String);

    if(note.owner !== Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }

    Notes.remove(note._id);
  }
});



Meteor.startup(() => {
  // code to run on server at startup
});

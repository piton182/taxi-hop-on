import { Template } from 'meteor/templating';
import { Rides } from '../both/rides.js'

import './main.html';

Template.hello.onCreated(function helloOnCreated() {

});

Template.hello.helpers({
  rides() {
    return Rides.find({});
  },
});

Template.hello.events({
  'click .js-ride-join'(event, instance) {
    if (Meteor.user()) {
      const username = Meteor.user().emails[0].address;
      Rides.update({_id: this._id}, {$set: {coriders: username}})
    }
  }
});

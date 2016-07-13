import { Template } from 'meteor/templating';

import './main.html';

import { Rides } from '../both/rides.js'

Template.whoami.onCreated(function helloOnCreated() {

});

Template.whoami.helpers({
  me() {
    return Meteor.user().emails[0].address;
  },
});



Template.hello.onCreated(function helloOnCreated() {

});

Template.hello.helpers({
  rides() {
    return Rides.find({});
  },
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

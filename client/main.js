import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Rides } from '../both/rides.js'

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  this.state = new ReactiveDict()
  this.state.setDefault({
    // selectedRide: {...},
  });
});

Template.hello.helpers({
  rides() {
    return Rides.find({});
  },
  selectedRide() {
    const instance = Template.instance();
    return instance.state.get('selectedRide');
  }
});

Template.hello.events({
  'click .js-ride-join'(event, instance) {
    if (Meteor.user()) {
      const username = Meteor.user().emails[0].address;

      Rides.update(
        {_id: instance.state.get('selectedRide')._id },
        { $set: { coriders: username } }
      );
    }
  },
  'click .ride-time'(event, instance) {
    instance.state.set('selectedRide', this);
  }
});

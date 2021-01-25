/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import PushNotification from 'react-native-push-notification';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('onNotification:', notification);
    notification.finish(true);
  },
  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: false,
});

const App: () => React$Node = () => {
  function testCancel() {
    console.log(new Date() + 'invoking function testCancel');
    PushNotification.cancelAllLocalNotifications();
  }

  function testPush() {
    console.log(new Date() + 'invoking function testPush');
    const dateAssigned = scheduledDateTime(8, 20);
    console.log(dateAssigned);
    PushNotification.localNotificationSchedule({
      channelId: 'fooChannel', // (required) channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
      message: 'My Notification Message', // (required)
      userInfo: {foo: 'bar', when: new Date()},
      date: dateAssigned,
      repeatType: 'day',
    });
  }

  function scheduledDateTime(hour, minute) {
    const now = new Date();
    const schTimeToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hour,
      minute,
    );
    const thirtySeconds = 30 * 1000;
    const thirtySecondsFromNow = new Date(now.getTime() + 30 * 1000);
    const twentyFourHours = 24 * 60 * 60 * 1000;
    const schTimeTomorrow = new Date(schTimeToday.getTime() + twentyFourHours);
    return schTimeToday > thirtySecondsFromNow ? schTimeToday : schTimeTomorrow;
  }

  function listThings(things) {
    things.forEach((thing) => {
      console.log(thing.id);
      console.log(thing.date);
    });
  }

  function listAllScheduledNotifications() {
    PushNotification.getScheduledLocalNotifications(listThings);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <TouchableOpacity style={styles.buttonLook} onPress={testPush}>
              <Text style={styles.sectionTitle}>Push</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonLook}
              onPress={listAllScheduledNotifications}>
              <Text style={styles.sectionTitle}>List all Notification</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonLook} onPress={testCancel}>
              <Text style={styles.sectionTitle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  buttonLook: {
    marginRight: 5,
    marginLeft: 5,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
});

export default App;

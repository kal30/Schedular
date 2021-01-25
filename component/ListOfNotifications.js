/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import PushNotification from 'react-native-push-notification';

const Item = ({id}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{id}</Text>
  </View>
);

const ListOfNotifications: () => React$Node = () => {
  const [alarms, setAlarms] = useState([]);

  function listThings(things) {
    things.forEach((thing) => {
      console.log(thing.id);
      console.log(thing.date);
    });
  }

  function writeOutThings(things) {
    console.log(things);
    setAlarms(things);
  }

  function listAllScheduledNotifications() {
    PushNotification.getScheduledLocalNotifications(writeOutThings);
  }

  const renderItem = ({item}) => <Item id={item.id} />;

  return (
    <>
      <TouchableOpacity
        style={styles.buttonLook}
        onPress={listAllScheduledNotifications}>
        <Text style={styles.sectionTitle}>List all Notification</Text>
      </TouchableOpacity>

      <FlatList
        data={alarms}
        keyExtractor={(item, index) => 'text' + index}
        renderItem={renderItem}
      />
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

  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default ListOfNotifications;

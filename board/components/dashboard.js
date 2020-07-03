// import auth from '@react-native-firebase/auth';
// import React, { Component } from 'react';
// import { StyleSheet, View, Text, Button } from 'react-native';


// export default class Dashboard extends Component {
//   constructor() {
//     super();
//     this.state = { 
//       uid: ''
//     }
//   }

//   signOut = () => {
//     auth().signOut().then(() => {
//       this.props.navigation.navigate('Login')
//     })
//     .catch(error => this.setState({ errorMessage: error.message }))
//   }  

//   render() {
//     this.state = { 
//       displayName: auth().currentUser.displayName,
//       uid: auth().currentUser.uid
//     }    
//     return (
//       <View style={styles.container}>
//         <Text style = {styles.textStyle}>
//           Hello, {this.state.displayName}
//         </Text>

//         <Button
//           color="#3740FE"
//           title="Logout"
//           onPress={() => this.signOut()}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     display: "flex",
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 35,
//     backgroundColor: '#fff'
//   },
//   textStyle: {
//     fontSize: 15,
//     marginBottom: 20
//   }
// });


import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import BoardScreen from './BoardScreen';
import BoardDetailScreen from './BoardDetailScreen';
import AddBoardScreen from './AddBoardScreen';
import EditBoardScreen from './EditBoardScreen';

const RootStack = createStackNavigator(
  {
    Board: BoardScreen,
    BoardDetails: BoardDetailScreen,
    AddBoard: AddBoardScreen,
    EditBoard: EditBoardScreen,
  },
  {
    initialRouteName: 'Board',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#777777',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);
const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
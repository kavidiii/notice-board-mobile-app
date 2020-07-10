 import React , { Component } from 'react';
import { StyleSheet, Text, View,Button,div } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import BoardScreen from './BoardScreen';
import BoardDetailScreen from './BoardDetailScreen';
import AddBoardScreen from './AddBoardScreen';
import EditBoardScreen from './EditBoardScreen';
import auth from '@react-native-firebase/auth';
class dashboard extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerMiddle:(
        <Button
        title= 'Sign Out'
          buttonStyle={{ padding: 0,color:'#517fa4'  , fontSize: 28 }}
          onPress={() => this.signOut()}
        />
      ),
      
      
    };
  };
}
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
  signOut = () => {
    auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  } 
  render() {
    return (
      <React.Fragment>
    
      <AppContainer />
      <Button
      color="#3740FE"
      title="Logout"
      style={{
        right: 5,
        top: 5,
         
      }}
      onPress={() => this.signOut()}
    /> 
    
    </React.Fragment>)
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
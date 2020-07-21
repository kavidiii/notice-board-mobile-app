import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View ,Image} from 'react-native';
 import { List, ListItem, Text, Card, Button,icon } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
class BoardDetailScreen extends Component {
  static navigationOptions = {
    title: 'Board Details',
  };
  constructor() {
    super();
    this.state = {
      isLoading: true,
      board: {},
      key: ''
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    const ref = firestore().collection('boards').doc(JSON.parse(navigation.getParam('boardkey')));
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }
  deleteBoard(key) {
    const { navigation } = this.props;
    this.setState({
      isLoading: true
    });
    firestore().collection('boards').doc(key).delete().then(() => {
      console.log("Document successfully deleted!");
      this.setState({
        isLoading: false
      });
      navigation.navigate('Board');
    }).catch((error) => {
      console.error("Error removing document: ", error);
      this.setState({
        isLoading: false
      });
    });
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    return (
      <View>
        <Image source = {require("./image/g.jpg")}
      style = {{position: "absolute",width: '100%', height: '300%' }}
  > 
  </Image> 
        <Card style={styles.container}>
          <View style={styles.subContainer}style={{padding: 20}}>
            <View>
              <Text h3>{this.state.board.title}</Text>
            </View>
            <View style={{padding: 20}}>
              <Text h5>{this.state.board.description}</Text>
            </View>
            <View style={{padding: 20}}>
              <Text h4>{this.state.board.author}</Text>
            </View>
          </View>
          {
             this.state.board.author == auth().currentUser.displayName ?
          <View style={styles.detailButton}>
            <Button
              large
              backgroundColor={'#CCCCCC'}
              leftIcon={{name: 'edit'}}
              title='Edit'
              onPress={() => {
                this.props.navigation.navigate('EditBoard', {
                  boardkey: `${JSON.stringify(this.state.key)}`,
                });
              }} />
          </View>
          :<View></View>
        } 
         {
            this.state.board.author == auth().currentUser.displayName ?
          <View style={styles.detailButton}>
            <Button
              large
              backgroundColor={'#999999'}
              color={'#FFFFFF'}
              leftIcon={{name: 'delete'}}
              title='Delete'
              onPress={() => this.deleteBoard(this.state.key)} />
          </View>
           :<View></View>
          } 
        </Card>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40
  },
  subContainer: {
    flex: 1,
    padding: 20,
    paddingBottom: 100,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailButton: {
    marginTop: 10
  }
})

export default BoardDetailScreen;
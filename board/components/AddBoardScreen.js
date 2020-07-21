import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput,Button,Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class AddBoardScreen extends Component {
  static navigationOptions = {
    title: 'Add Notice',
  };
  constructor() {
    super();
    this.ref = firestore().collection('boards');
    this.state = {
      title: '',
      description: '',
      author: auth().currentUser.displayName,
      createdAt: new Date().getTime(),
      isLoading: false,
    };
  }
  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  saveBoard() {
    this.setState({
      isLoading: true,
    });
    this.ref.add({
      title: this.state.title,
      description: this.state.description,
      author: this.state.author,
      createdAt: this.state.createdAt,
    }).then((docRef) => {
      this.setState({
        title: '',
        description: '',
        author: '',
        createdAt:'',
        isLoading: false,
      });
      this.props.navigation.goBack();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color='green' />
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
          <Image source = {require("./image/tt.jpg")}
      style = {{position: "absolute",width: '100%', height: '90%' }}
  > 
  </Image> 
        <View style={styles.subContainer}>

          <TextInput
              placeholder={'Title'}
              value={this.state.title}
              onChangeText={(text) => this.updateTextInput(text, 'title')}
              style={{marginTop:20,fontWeight: "bold",marginLeft:30,color: 'black',fontSize:18}}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
             style={{marginTop:20,fontWeight: "bold",marginLeft:30,color: 'black',fontSize:18}}
              multiline={true}
              numberOfLines={4}
              placeholder={'Description'}
              value={this.state.description}
              onChangeText={(text) => this.updateTextInput(text, 'description')}
              
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              style={{marginTop:20,fontWeight: "bold",marginLeft:30,color: 'green',fontSize:18}}
              placeholder={'Author'}
              value={this.state.author}
              onChangeText={(text) => this.updateTextInput(text, 'author')}
          />
        </View>
        <View style={styles.button}>
          <Button
            large
            leftIcon={{name: 'save'}}
            title='Save'
            onPress={() => this.saveBoard()} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
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
  }
})

export default AddBoardScreen;
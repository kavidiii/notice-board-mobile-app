import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput,Image } from 'react-native';
import { Button } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';

class EditBoardScreen extends Component {
  static navigationOptions = {
    title: 'Edit Board',
  };
  constructor() {
    super();
    this.state = {
      key: '',
      isLoading: true,
      title: '',
      description: '',
      author: '',
      createdAt:''
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    const ref = firestore().collection('boards').doc(JSON.parse(navigation.getParam('boardkey')));
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          title: board.title,
          description: board.description,
          author: board.author,
          createdAt:board.createdAt,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  updateBoard() {
    this.setState({
      isLoading: true,
    });
    const { navigation } = this.props;
    const updateRef =  firestore().collection('boards').doc(this.state.key);
    updateRef.set({
      title: this.state.title,
      description: this.state.description,
      author: this.state.author,
      createdAt:this.state.createdAt
    }).then((docRef) => {
      this.setState({
        key: '',
        title: '',
        description: '',
        author: '',
        createdAt:'',
        isLoading: false,
      });
      this.props.navigation.navigate('Board');
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
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
         <Image source = {require("./image/dd.jpg")}
      style = {{position: "absolute",width: '100%', height: '90%' }}
  > 
  </Image> 
        <View style={styles.subContainer}>
          <TextInput
             style={{marginTop:20,fontWeight: "bold",marginLeft:30,color: 'red',fontSize:18}}
              placeholder={'Title'}
              value={this.state.title}
              onChangeText={(text) => this.updateTextInput(text, 'title')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              style={{marginTop:20,fontWeight: "bold",marginLeft:30,color: '#1C2833 ',fontSize:18}}
              multiline={true}
              numberOfLines={4}
              placeholder={'Description'}
              value={this.state.description}
              onChangeText={(text) => this.updateTextInput(text, 'description')}
          />
        </View>
        
        <View style={styles.button}>
          <Button
            large
            leftIcon={{name: 'update'}}
            title='Update'
            onPress={() => this.updateBoard()} />
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

export default EditBoardScreen;
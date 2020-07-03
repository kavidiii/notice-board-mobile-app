// import React, { Component } from 'react';
// import { Button, View, Text } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// class BoardScreen extends Component {
//   static navigationOptions = {
//     title: 'Board List',
//   };
//   render() {
//     return (
       
//       firestore().collection('boards')
//       .get()
//       .then(snapshot => {
//         snapshot
//           .docs
//           .forEach(doc => {
//             console.log(JSON.parse(doc._document.data.toString()))
//           });
//       })
//     );
//     }
// }

// export default BoardScreen;
import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text} from 'react-native';
 import { List, ListItem, Button, Icon } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
class BoardScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      
      headerRight: (
        <Button
        title= 'Board List'
          buttonStyle={{ padding: 0, backgroundColor: 'transparent' }}
          icon={{ name: 'add-circle', style: { marginRight: 0, fontSize: 28 } }}
          onPress={() => { navigation.push('AddBoard') }}
        />
      ),
    };
  };
  constructor() {
    super();
    this.ref = firestore().collection('boards').orderBy('createdAt','desc');
    this.unsubscribe = null;
    this.state = {
      isLoading: true,
      boards: []
    };
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      const { title, description, author } = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        author,
      });
    });
    this.setState({
      boards,
      isLoading: false,
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
      // <View style={styles.container}>
        
          
             
      //           {this.state.boards.map( (item,i) => <View style={styles.item}><Text >{item.title}  </Text></View>)}
      //         {/* <ListItem
      //           key={i}
                
      //           title={item.title}
                
      //           leftIcon={{name: 'book', type: 'font-awesome'}}
      //           // onPress={() => {
      //           //   this.props.navigation.navigate('BoardDetails', {
      //           //     boardkey: '${JSON.stringify(item.key)}',
      //           //   });
      //           // }}
      //         />
      //        )) */}
          
        
      // </View>
      <View style={styles.container}>
        
          {
            this.state.boards.map((item, i) => (
              <ListItem
                key={i}
                title={item.title}
                leftIcon={{name: 'book', type: 'font-awesome'}}
                onPress={() => {
                  this.props.navigation.navigate('BoardDetails', {
                    boardkey: `${JSON.stringify(item.key)}`,
                  });
                }}
              />
            ))
          }
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
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

export default BoardScreen;
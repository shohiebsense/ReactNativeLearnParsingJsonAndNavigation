'use-strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  SectionList,
  Text,
} from 'react-native'
import Constants from 'expo-constants'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = {}
const DATA = [
  {
    title: 'coord',
    data: ['Test'],
  },
  {
    title: 'weather',
    data: ['Test'],
  },
  {
    title: 'base',
    data: ['Stations'],
  },
  {
    title: 'Main',
    data: ['Test'],
  },
]

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
)

export default class SearchResults extends Component<Props> {
  constructor(props) {
    super(props)
  }

  static navigationOptions = {
    title: 'Results',
  }

  _keyExtractor = (item, index) => index.toString()

  _renderItem = ({ item }) => {
    return (
      <TouchableHighlight underlayColor="#dddddd">
        <View>
          <Text>{item}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    const data = this.props.route.params.data
    let resultData = []
    let aa = Array.isArray(data)
    console.log(`isarray + ${aa} length ${data.length}`)
    // Object.entries(data).forEach(([key, value], index) => {
    //   var obj = {}
    //   obj.key = key
    //   if (typeof value === 'object' && value !== null) {
    //     console.log(`${key}`)
    //     obj.value = []
    //     var subObj = {}
    //     Object.entries(value).forEach(([childKey, childValue], jndex) => {
    //       console.log(`index ke ${index}`)
    //       subObj.key = childKey
    //       if (typeof childValue === 'object' && childValue !== null) {
    //         var grandChildObj = {}
    //         subObj.value = []
    //         Object.entries(childValue).forEach(
    //           ([grandChildKey, grandChildValue]) => {
    //             grandChildObj.key = grandChildKey
    //             obj[index] = grandChildValue
    //             console.log(`${grandChildKey}: ${grandChildValue}`)
    //           },
    //         )
    //       } else {
    //         subObj.value = childValue
    //         console.log(`${childKey}: ${childValue}`)
    //       }
    //       obj.value.push(subObj)
    //     })
    //   } else {
    //     obj.value = value
    //     console.log(`${key}: ${value}`)
    //   }
    //   resultData.push(obj)
    // })
    return (
      <SafeAreaView style={styles.container}>
        <SectionList
          sections={data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        ></SectionList>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd',
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC',
  },
  title: {
    fontSize: 20,
    color: '#656565',
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
})

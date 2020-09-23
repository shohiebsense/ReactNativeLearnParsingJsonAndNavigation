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

const Item = ({ title }) => (
  <View style={styles.headerItem}>
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
      <TouchableHighlight style={styles.item} underlayColor="#dddddd">
        <View>
          <Text style={styles.itemText}>{item}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    const data = this.props.route.params.data
    let resultData = []
    // let aa = Array.isArray(data)
    // console.log(`isarray + ${aa} length ${data.length}`)

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
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    color: '#2F4F4F',
    paddingTop: 12,
    backgroundColor: '#fff',
    borderTopColor: '#D3D3D3',
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderStartColor: '#D3D3D3',
    borderStartWidth: 1,
    borderEndColor: '#D3D3D3',
    borderEndWidth: 1,
    textTransform: 'capitalize',
    paddingBottom: 16,
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
  headerItem: {
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    marginVertical: 8,
    paddingTop: 16,
    paddingBottom: 16,
  },
  item: {
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    marginVertical: 8,
  },
  itemText: {
    color: '#708090',
    fontSize: 18,
    textTransform: 'capitalize',
    lineHeight: 18,
  },
})

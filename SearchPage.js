'use-strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
} from 'react-native'
import Config from 'react-native-config'

type Props = {}

function urlForQueryAndPage(key, value, pageNumber) {
  // const data = {
  //   country: 'uk',
  //   pretty: '1',
  //   encoding: 'json',
  //   listing_Type: 'buy',
  //   action: 'search_listings',
  //   page: pageNumber,
  // }
  const data = {}
  data[key] = value

  const querystring = Object.keys(data)
    .map((key) => key + '=' + encodeURIComponent(data[key]))
    .join('&')
  return (
    'https://api.openweathermap.org/data/2.5/weather?' +
    querystring +
    `&appid=${Config.OPEN_WEATHER_API_KEY}`
  )
}

export default class SearchPage extends Component<Props> {
  static navigationOptions = {
    title: 'Property Finder',
  }

  constructor(props) {
    super(props)
    this.state = {
      searchString: 'london',
      isLoading: false,
      message: '',
    }
  }

  _onSearchTextChanged = (event) => {
    console.log('_onsearchTextChanged')
    this.setState({ searchString: event.nativeEvent.text })
    console.log(
      'Current: ' +
        this.state.searchString +
        ', Next ' +
        event.nativeEvent.text,
    )
  }

  _onSearchPressed = () => {
    const query = urlForQueryAndPage('q', this.state.searchString, 1)
    this._executeQuery(query)
  }

  _executeQuery = (query) => {
    //console.log(query)
    this.setState({ isLoading: true })
    fetch(query)
      .then((response) => {
        const statusCode = response.status
        const data = response.json()
        return Promise.all([statusCode, data])
      })
      .then(([statusCode, data]) => {
        //console.log(statusCode, data)
        this._handleResponse(data)
      })
      .catch((error) => {
        console.log(error)
        this.setState({
          isLoading: false,
          message: 'Something bad happened ' + error,
        })
      })
  }

  _handleResponse = (data) => {
    this.setState({ isLoading: false, message: '' })
    //console.log('response ' + data.visibility)

    //const coordObj = data.coord
    //console.log(coordObj.lon)\

    const resultData = []
    Object.entries(data).forEach(([key, value], index) => {
      let obj = {}
      obj.title = key
      obj.data = []
      if (typeof value === 'object' && value !== null) {
        //console.log(`${key}`)
        //obj.value = []
        Object.entries(value).forEach(([childKey, childValue], jndex) => {
          //console.log(`index ke ${index}`)
          if (typeof childValue === 'object' && childValue !== null) {
            Object.entries(childValue).forEach(
              ([grandChildKey, grandChildValue]) => {
                obj.data.push(`${grandChildKey} ==> ${grandChildValue}`)
                //console.log(`${grandChildKey}: ${grandChildValue}`)
              },
            )
          } else {
            if (childKey === 'temp') {
              console.log('this is temp!!!')
            }
            obj.data.push(`${childKey} : ${childValue}`)
            //console.log(`${childKey}: ${childValue}`)
          }
          obj.data.join('')
        })
      } else {
        obj.data.push(value)
        //console.log(`${key}: ${value}`)
      }

      resultData.push(obj)
    })
    console.log(resultData)

    this.props.navigation.navigate({
      name: 'Results',
      params: {
        data: resultData,
      },
    })

    // if (response.application_response_code.substr(0, 1) === '1') {
    //   console.log('Properties found: ' + response.listings.length)
    // } else {
    //   this.setState({ message: 'Location not recognized; please try again.' })
    // }
  }

  iterate(item, index) {
    console.log(`${item} has index ${index}`)
  }

  render() {
    const spinner = this.state.isLoading ? (
      <ActivityIndicator size="large" />
    ) : null
    console.log('SearchPage.render')
    return (
      <View style={styles.container}>
        <Text style={styles.description}>Search for houses to buy!</Text>
        <Text style={styles.description}>
          Search by place-name or postcode.
        </Text>
        <View style={styles.flowRight}>
          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.searchInput}
            placeholder="Search via name or postcode"
            value={this.state.searchString}
            onChange={this._onSearchTextChanged}
          />
          <Button onPress={this._onSearchPressed} color="#48BBEC" title="Go" />
        </View>
        <Image source={require('./resources/house.png')} style={styles.Image} />
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565',
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center',
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC',
  },
  image: {
    width: 217,
    height: 138,
  },
})

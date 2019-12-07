import React, { Component } from 'react';
import { View, DeviceEventEmitter, Text, Image, NativeModules, StyleSheet } from 'react-native';

const img = './src/assets/annonymous.png'

export default class fingerprinttest extends Component {

  constructor(props) {
    super(props)
    this.state = {
      status: 'Prove you own this cellphone'
    }
  }

  componentDidMount() {
    DeviceEventEmitter.addListener('FINGERPRINT_SCANNER_AUTHENTICATION', (msg) => {
      this.setState({ status: msg })
    })

    this.scan().then(success => success ? this.setState({ status: 'successfully authenticated' }) : console.log(success))
  }

  async scan() {
    return await NativeModules.ReactNativeFingerprintScanner.authenticate()
  }


  render() {
    return (
      <View style={styles.container}>
        <Image style={{ width: 100, height: 100 }} source={require(img)} />
        <Text style={styles.text}>{this.state.status}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  text: {
    fontSize: 23,
    color: 'blue'
  }

})

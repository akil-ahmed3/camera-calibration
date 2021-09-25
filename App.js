import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Camera } from 'expo-camera'

export default function App() {
  const [startCamera, setStartCamera] = React.useState(false)
  const [pitchView, setPitchView] = React.useState(false)

  let camera

  const __takePicture = async () => {
    if (!camera) return
    const photo = await camera.takePictureAsync()
  }

  const __startCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync()
    if (status === 'granted') {
      setStartCamera(true)
    } else {
      Alert.alert("Access denied")
    }
  }

  const _pitchView = () => {
    console.log(pitchView)
    if (pitchView === true) {
      setPitchView(false)
    } else {
      setPitchView(true)
    }
  }
  return (
    <View style={styles.container}>
      {startCamera ? (
        <Camera
          ratio='4:3'
          style={{ flex: 1, width: "100%" }}
          ref={(r) => {
            camera = r
          }}
        >
          {pitchView ?
            <View style={styles.pitch}>
              <Image style={styles.tinyLogo} source={require('./assets/pitch.png')} />
            </View>
            : <View style={styles.noPitch}>
            </View>}

          <View
            style={{
              position: 'absolute',
              bottom: 0,
              flexDirection: 'row',
              flex: 1,
              width: '100%',
              padding: 20,
              justifyContent: 'space-between'
            }}
          >
            <View
              style={{
                alignSelf: 'center',
                flex: 1,
                alignItems: 'center'
              }}
            >
              <TouchableOpacity
                onPress={__takePicture}
                style={{
                  width: 70,
                  height: 70,
                  bottom: 0,
                  borderRadius: 50,
                  backgroundColor: '#fff'
                }}
              />
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={_pitchView}
              style={{
                width: 70,
                borderRadius: 45,
                backgroundColor: '#fff',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 70,
                marginBottom: 20
              }}
            >
              <Text
                style={{
                  color: '#000',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 30
                }}
              >
                C
            </Text>
            </TouchableOpacity>
          </View>

        </Camera>

      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            onPress={__startCamera}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: '#14274e',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Take picture
            </Text>
          </TouchableOpacity>
        </View>
      )
      }
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tinyLogo: {
    width: 720,
    height: 720
  },
  pitch: {
    paddingTop: 200,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  noPitch: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.0)'
    // alignItems: 'center',
    // justifyContent: 'center'
  }

})
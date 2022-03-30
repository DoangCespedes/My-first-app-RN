import React, { useState } from 'react';
import {Text, View, StyleSheet, Image, Alert, Button, TouchableOpacity, Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import uploadToAnonymousFilesAsync from 'anonymous-files';
import diamon from './assets/diamon-red.png';


const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
let openImagePickerAsync = async () => {
  let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

  if (permissionResult.granted === false) {
    alert('Permission to acces camera is required');
    return;
  }

  const pickerResult = await ImagePicker.launchImageLibraryAsync()
  if (pickerResult.cancelled === true) {
    return;
  }
  if (Platform.OS === 'web' ) {
    const remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri)
    console.log(remoteUri)
    setSelectedImage({localUri: pickerResult.uri, remoteUri: remoteUri})
  }else {
    setSelectedImage({localUri: pickerResult.uri});
  }
}
const openShareDialog = async () => {
  if (!(await Sharing.isAvailableAsync())) {
    alert("Sharing, is not avalible on your plataform");
    return; 
  }
  await Sharing.shareAsync(selectedImage.localUri)
}

  return (
    <View style={styles.container} >
      <Image
        source={diamon}
        style={styles.image}
      />
      <Button
        onPress={() => Alert.alert('Sebas pato !!!!')}
        title="Tocame"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Text style={styles.title}> Hello world! </Text>
      <TouchableOpacity
        onPress={openImagePickerAsync}
      >
        <Image
          source={{
            uri: 
            selectedImage !== null 
            ? selectedImage.localUri 
            : 'https://picsum.photos/200/200'}}
          style={styles.image}
        />
      </TouchableOpacity>
      {selectedImage ?(
        <TouchableOpacity onPress={openShareDialog} style={styles.button}>
        <Text style={styles.buttonText}>Share this image</Text>
      </TouchableOpacity>
      ):(
        <View/>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#292929"

  },
  title: {fontSize: 30, color:"#fff" },
  image: { height:200, width:200, borderRadius: 100},
  button: {backgroundColor:`#00ffff`,
            color:"#fff",
            padding: 7,
            marginTop:10,
            borderRadius: 10, },
  buttonText: {color:"#000", fontSize: 15, textAlign:"center"}

})

export default App
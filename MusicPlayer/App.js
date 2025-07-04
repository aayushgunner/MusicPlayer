import { Image, ImageBackground,StyleSheet, Text, View,Dimensions } from 'react-native';
import Navigation from './Navigation';
const bgimage = require('./assets/bg.jpg');

  const { height, width } = Dimensions.get('window');
export default function App() {
  return (
       <ImageBackground source={bgimage} style={styles.backgroundImage} >
                	  <Navigation/>
                    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
    resizeMode: 'cover', // or 'stretch' for different effects
  },});

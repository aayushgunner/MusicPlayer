import { StatusBar } from 'expo-status-bar';
import { Image, ImageBackground,StyleSheet, Text, View } from 'react-native';
export default function App() {
  const bgimage = require('./assets/bg.jpg');
  return (
    <View style={styles.container}>
       <ImageBackground source={bgimage} resizeMode="cover" style={styles.backgroundImage}>
      <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

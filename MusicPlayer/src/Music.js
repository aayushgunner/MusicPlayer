import React, { useState, useEffect } from 'react';
import { StatusBar, Alert, TextInput } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Audio } from 'expo-av';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Music() {
  const [musicFiles, setMusicFiles] = useState([]);
  const [playing, setPlaying] = useState(-1);
  const [sound, setSound] = useState(null);
  const [progressDuration, setProgressDuration] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchMusicFiles = async () => {
    Alert.alert(
      "Permission Request",
      "This app needs access to your media library to play music. Do you allow?",
      [
        {
          text: "Don't Allow",
          onPress: () => console.log("Permission denied"),
          style: "cancel"
        },
        {
          text: "Allow",
          onPress: async () => {
            const permission = await MediaLibrary.requestPermissionsAsync();
            if (permission.granted) {
              const media = await MediaLibrary.getAssetsAsync({
                mediaType: MediaLibrary.MediaType.audio,
                first: 100,
              });
              setMusicFiles(media.assets);
            } else {
              console.log("Permission denied");
            }
          }
        }
      ]
    );
  };

  const playMusic = async (fileUri) => {
    const { sound } = await Audio.Sound.createAsync({
      uri: fileUri,
    });
    setSound(sound);
    await sound.playAsync();
  };

  const pauseMusic = async () => {
    await sound.pauseAsync();
  };

  useEffect(() => {
    if (!sound) {
      return;
    }
    sound.setOnPlaybackStatusUpdate(async (status) => {
      if (status.didJustFinish) {
        setPlaying(-1);
        await sound.unloadAsync();
        setSound(null);
      } else {
        setProgressDuration(status.positionMillis / 1000);
      }
    });
  }, [sound]);

  useEffect(() => {
    fetchMusicFiles();
  }, []);

  // Filter music files based on search query
  const filteredMusicFiles = musicFiles.filter(file =>
    file.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TextInput
        style={styles.searchInput}
        placeholder="Search songs..."
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {filteredMusicFiles.map((file, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              if (playing == -1) {
                playMusic(file.uri);
                setPlaying(index);
              }

              else if (playing!==index) {

                pauseMusic();
                setProgressDuration(0);
                playMusic(file.uri);
                setPlaying(index);
              }

              else {
                pauseMusic();
                setPlaying(-1);
              }
            }}
            style={styles.playButton}
          >
            <View style={styles.row}>
              <Ionicons
                name={playing !== index ? "play" : "pause"}
                size={30}
                color="white"
              />
              <Text style={styles.fileName}>{file.filename}</Text>
            </View>
            {playing === index && (
              <Text style={styles.fileName}>
                {progressDuration} / {file.duration}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    height: "100%",
    marginTop: 50,
  },
  fileName: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  playButton: {
    backgroundColor: "gray",
    borderRadius: 50,
    padding: 10,
    margin: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  searchInput: {
    backgroundColor: "#eaeaea",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
});

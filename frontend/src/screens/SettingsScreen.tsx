import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfile, updateProfile } from '../services/auth'; 

const SettingsScreen = ({ navigation }: { navigation: any }) => {
  const [profile, setProfile] = useState({ username: '', email: '' });
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        setToken(userToken);
        if (userToken) {
          const userProfile = await getProfile(userToken);
          setProfile(userProfile.data); 
        }
      } catch (error) {
        console.error('Failed to fetch profile', error);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      if (token) {
        await updateProfile(profile, token);
        Alert.alert('Profile updated!');
      }
    } catch (error) {
      console.error('Failed to update profile', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={profile.username}
        onChangeText={(text) => setProfile({ ...profile, username: text })}
      />
      <TextInput
        placeholder="Email"
        value={profile.email}
        onChangeText={(text) => setProfile({ ...profile, email: text })}
      />
      <Button title="Update Profile" onPress={handleUpdateProfile} />
    </View>
  );
};

export default SettingsScreen;

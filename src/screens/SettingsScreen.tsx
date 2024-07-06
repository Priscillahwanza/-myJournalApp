import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfile, updateProfile } from '../services/auth';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<any>; // Adjust any to your navigation stack type
};

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const [profile, setProfile] = useState({ username: '', password: '' });
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken || '');
      if (storedToken) {
        const response = await getProfile(storedToken);
        setProfile(response.data);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(profile, token);
      alert('Profile updated!');
    } catch (error) {
      console.error('Failed to update profile', error);
      alert('Failed to update profile');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <TextInput
        style={styles.input}
        value={profile.username}
        placeholder="Username"
        onChangeText={(text) => setProfile({ ...profile, username: text })}
      />
      <TextInput
        style={styles.input}
        value={profile.password}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setProfile({ ...profile, password: text })}
      />
      <Button title="Update Profile" onPress={handleUpdateProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, padding: 8 }
});

export default SettingsScreen;

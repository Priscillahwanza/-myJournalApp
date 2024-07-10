import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<any>; 
};


const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleNavigation = () => {
    navigation.navigate('JournalEntry');
  };

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Go to Journal Entry" onPress={handleNavigation} />
    </View>
  );
};

export default HomeScreen;

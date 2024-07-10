import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<any>; // Adjust any to your navigation stack type
};

type Entry = {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
};

const JournalEntryScreen: React.FC<Props> = ({ navigation }) => {
  const [newEntry, setNewEntry] = useState<Entry>({
    id: 0,
    title: '',
    content: '',
    category: '',
    date: '',
  });

  const [entries, setEntries] = useState<Entry[]>([]);

  const handleAddEntry = () => {
    // Example of adding a new entry
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    setNewEntry({
      id: newEntry.id + 1,
      title: '',
      content: '',
      category: '',
      date: '',
    });
  };

  return (
    <View style={styles.container}>
      <Text>Journal Entry</Text>
      <TextInput
        style={styles.input}
        value={newEntry.title}
        placeholder="Title"
        onChangeText={(text) => setNewEntry({ ...newEntry, title: text })}
      />
      <TextInput
        style={styles.input}
        value={newEntry.content}
        placeholder="Content"
        onChangeText={(text) => setNewEntry({ ...newEntry, content: text })}
      />
      <TextInput
        style={styles.input}
        value={newEntry.category}
        placeholder="Category"
        onChangeText={(text) => setNewEntry({ ...newEntry, category: text })}
      />
      <TextInput
        style={styles.input}
        value={newEntry.date}
        placeholder="Date"
        onChangeText={(text) => setNewEntry({ ...newEntry, date: text })}
      />
      <Button title="Add Entry" onPress={handleAddEntry} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, padding: 8 }
});

export default JournalEntryScreen;

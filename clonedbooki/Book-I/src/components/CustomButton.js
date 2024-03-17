import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function CustomButton({label, onPress,navigation, destination}) {
  const handlePress = () => {
    // Navigate to the specified destination if provided
    if (destination) {
      navigation.navigate(destination);
    } else if (onPress) {
      onPress(); // Call the provided onPress function if it exists
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        backgroundColor: '#0B1C52',
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
          color: '#fff',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

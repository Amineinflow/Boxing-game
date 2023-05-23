import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const CallScreen = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [input5, setInput5] = useState('');
  const [input6, setInput6] = useState('');


  const handleEdit = () => {
    // Faites quelque chose avec les valeurs des champs de saisie
    console.log('Valeur Input 1:', input1);
    console.log('Valeur Input 2:', input2);
    console.log('Valeur Input 3:', input3);
    console.log('Valeur Input 4:', input4);
    console.log('Valeur Input 5:', input5);
    console.log('Valeur Input 6:', input6);

  };

  const handleClose = () => {
    // Fermer l'onglet ou effectuer une autre action de fermeture
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={text => setInput1(text)}
        value={input1}
        placeholder="FullName"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setInput2(text)}
        value={input2}
        placeholder="Age"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setInput3(text)}
        value={input3}
        placeholder="Weightclass"
      />
     <Picker
        style={styles.input}
        selectedValue={input4}
        onValueChange={itemValue => setInput4(itemValue)}
      >
        <Picker.Item label="Heavyweight - No weight limit" value="Heavyweight" />
        <Picker.Item label="Light Heavyweight &lt; 95 kg" value="Light Heavyweight" />
        <Picker.Item label="Middleweight &lt; 84 kg" value="Middleweight" />
        <Picker.Item label="Welterweight &lt; 77 kg" value="Welterweight" />
        <Picker.Item label="Sega Lightweight &lt; 70 kg" value="Lightweight" />

      </Picker>
      <TextInput
        style={styles.input}
        onChangeText={text => setInput5(text)}
        value={input5}
        placeholder="Country"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setInput6(text)}
        value={input6}
        placeholder="Picture link"
      />
       <View style={styles.fixToText}>
        <Button
          title="+"
          onPress={handleEdit}
          style={styles.roundButton1}
          backgroundColor= 'rgba(52, 52, 52, 0.8)'

        />
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: 'center',
    padding: 10,
  },
  input: {
    marginBottom: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: '#000000',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 100,
  height: 100,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
  borderRadius: 100,
  backgroundColor: 'white',
},
});

export default CallScreen;

import React, { useState, useContext } from 'react';
import { View, Text, Keyboard, TouchableWithoutFeedback, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background, Input, SubmitButton, SubmitText } from './styles';
import Picker from '../../components/Picker';

import { format } from 'date-fns';

import { db } from '../../services/firebaseConnection';
import { set, ref, push, update, onValue } from 'firebase/database';

import { AuthContext } from '../../contexts/auth';

export default function New({ navigation }) {
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('receita');

  const { user } = useContext(AuthContext);

  function handleSubmit() {
    Keyboard.dismiss();

    if (isNaN(parseFloat(valor)) || tipo === null) {
      alert('Preencha todos os campos');
      return;
    }

    Alert.alert(
      'Confirmando dados',
      `Valor: R$ ${parseFloat(valor).toFixed(2)}\nTipo: ${tipo}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Continuar',
          onPress: () => { handleAdd() } 
        }
      ]
    )
  }

  async function handleAdd() {
    let newPostKey = push(ref(db, 'historico/' + user.id)).key;

    await set(ref(db, 'historico/' + user.uid + '/' + newPostKey), {
      tipo: tipo,
      valor: parseFloat(valor),
      date: format(new Date(), 'dd/MM/yyyy')
    })
    .then(() => {

      onValue(ref(db, 'users/' + user.uid), (snapshot) => {
        let saldoNew = parseFloat(snapshot.val().saldo);

        tipo === 'despesa' ? saldoNew -= parseFloat(valor) : saldoNew += parseFloat(valor);

        update(ref(db, 'users/' + user.uid), {
          saldo: saldoNew
        })
        .then(() => {
          alert('Registro efetuado!');
          Keyboard.dismiss();
          setValor('');
        })
        .finally(() => {
          navigation.navigate('Home');
        });

      }, {
        onlyOnce: true
      });
    });
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
      <Background>
        <SafeAreaView style={{ alignItems: 'center' }}>
          <Input
            placeholder="Valor desejado"
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => Keyboard.dismiss()}
            value={valor}
            onChangeText={(text) => setValor(text)}
          />

          <Picker onChange={setTipo} tipo={tipo} />

          <SubmitButton onPress={handleSubmit}>
              <SubmitText>Registrar</SubmitText>
          </SubmitButton>
        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>

  );
}
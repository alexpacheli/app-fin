import React, { useState, useContext } from 'react';
import { View, Text, Platform, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../contexts/auth';

import { BackGround, ContainerLogin, Logo, AreaInput, Input, SubmitButton, SubmitText, Link, LinkText } from '../SignIn/styles';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  
  const {signUp, loadingAuth} = useContext(AuthContext);

  function handleSignUp() {
    signUp(email, password, nome);
  }

  return (
    <BackGround borderTopWidth="1px" borderTopColor="#00b94a">
      <ContainerLogin
        beahvior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
      >
    
        <AreaInput>
          <Input
            placeholder="Nome"
            autoCorrect={false}
            value={nome}
            onChangeText={(text) => setNome(text)}
          />
        </AreaInput>
        
        <AreaInput>
          <Input
            placeholder="Email"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Senha"
            autoCorrect={false}
            autoCapitalize="none"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </AreaInput>

        <SubmitButton onPress={handleSignUp}>
        {loadingAuth ?
            (
              <ActivityIndicator size={20} color="#FFF" />
            )
            :
            (
              <SubmitText>Cadastrar</SubmitText>
            )
          }
          
        </SubmitButton>
      </ContainerLogin>

    </BackGround>
  );
}
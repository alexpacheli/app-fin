import React, { useState, useContext } from 'react';
import { View, Text, Platform, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { SIGN_UP_PASSWORD } from '@env';

import { BackGround, ContainerLogin, Logo, AreaInput, Input, SubmitButton, SubmitText, Link, LinkText } from './styles';

export default function SignIn({ navigation }) {
  //const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, loadingAuth } = useContext(AuthContext);

  function handleLogin() {
    signIn(email, password);
  }

  return (
    <BackGround borderTopWidth="0px" borderTopColor="#131313">
      <ContainerLogin
        beahvior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
      >
        <Logo source={require('../../assets/Logo.png')} />
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

        <SubmitButton onPress={handleLogin}>
          {loadingAuth ?
            (
              <ActivityIndicator size={20} color="#FFF" />
            )
            :
            (
              <SubmitText>Acessar</SubmitText>
            )
          }

        </SubmitButton>
      </ContainerLogin>

      {email == SIGN_UP_PASSWORD ? <Link onPress={() => navigation.navigate('SignUp')}><LinkText>Criar uma conta</LinkText></Link> : ''}

    </BackGround>
  );
}
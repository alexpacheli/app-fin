import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import {Container, Nome, NewLink, NewLinkText, Logout, LogoutText} from './styles';

export default function Profile({navigation}) {
  const {user, signOutFb} = useContext(AuthContext);

 return (
   <Container>
    <Nome>{user && user.nome}</Nome>
    <NewLink onPress={() => navigation.navigate('Registrar')}>
        <NewLinkText>Registrar Gastos</NewLinkText>
    </NewLink>
    <Logout onPress={() => signOutFb()}>
        <LogoutText>Sair</LogoutText>
    </Logout>
   </Container>
  );
}
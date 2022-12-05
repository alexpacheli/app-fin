import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import { BackGround, Container, Nome, Saldo, Title, List } from './styles';
import HistoricoList from '../../components/HistoricoList';

export default function Home() {
  const [historico, setHistorico] = useState([
    {key: '1', tipo: 'receita', valor: 1200},
    {key: '2', tipo: 'despesa', valor: 195},
    {key: '3', tipo: 'receita', valor: 222},
    {key: '4', tipo: 'despesa', valor: 505},
    {key: '5', tipo: 'receita', valor: 280},
    {key: '6', tipo: 'receita', valor: 222},
    {key: '7', tipo: 'despesa', valor: 505},
    {key: '8', tipo: 'receita', valor: 280},
  ])

  const { user } = useContext(AuthContext);

  return (
    <BackGround>
      <Container>
        <Nome>{user && user.nome}</Nome>
        <Saldo>R$ {user && user.saldo.toFixed(2)}</Saldo>
      </Container>

      <Title>Últimas movimentações</Title>

      <List
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={item => item.key}
        renderItem={({item}) => (<HistoricoList data={item} />) }
      />
    </BackGround>
  );
}
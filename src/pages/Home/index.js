import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth';
import { BackGround, Container, Nome, Saldo, Title, List } from './styles';
import HistoricoList from '../../components/HistoricoList';
import {format} from 'date-fns';

import { db } from '../../services/firebaseConnection';
import { onValue, ref, equalTo, query, orderByChild, limitToLast } from 'firebase/database';

export default function Home() {
  const [historico, setHistorico] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    function loadList() {
      const queryF = query(ref(db, 'historico/' + user.uid), orderByChild('date'), equalTo(format(new Date, 'dd/MM/yy')), limitToLast(10));

      onValue(queryF, (snapshot) => {
        setHistorico([]);

        snapshot.forEach((childItem) => {
          let list = {
            key: childItem.key,
            tipo: childItem.val().tipo,
            valor: childItem.val().valor
          }

          setHistorico(oldArray => [...oldArray, list].reverse());
        })
      })
    }

    loadList();

  }, []);


  return (
    <BackGround>
      <Container>
        <Nome>{user && user.nome}</Nome>
        <Saldo>R$ {user && user.saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Saldo>
      </Container>

      <Title>Últimas movimentações</Title>

      <List
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (<HistoricoList data={item} />)}
      />
    </BackGround>
  );
}
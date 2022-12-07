import React, { useContext, useState, useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { BackGround, Container, Nome, Saldo, Title, List, Area } from './styles';
import HistoricoList from '../../components/HistoricoList';
import {format, isPast, isBefore} from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from '../../components/DatePicker';

import { db } from '../../services/firebaseConnection';
import { onValue, ref, equalTo, query, orderByChild, limitToLast, remove, update } from 'firebase/database';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Home() {
  const [historico, setHistorico] = useState([]);
  const [newDate, setNewDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    function loadList() {
      const queryF = query(ref(db, 'historico/' + user.uid), orderByChild('date'), equalTo(format(newDate, 'dd/MM/yyyy')), limitToLast(10));

      onValue(queryF, (snapshot) => {
        setHistorico([]);

        snapshot.forEach((childItem) => {
          let list = {
            key: childItem.key,
            tipo: childItem.val().tipo,
            valor: childItem.val().valor,
            date: childItem.val().date
          }

          setHistorico(oldArray => [...oldArray, list].reverse());
        })
      })
    }

    loadList();

  }, [newDate]);

  function handleDelete(data) {

    //DataItem
    const [diaItem, mesItem, anoItem] = data.date.split('/');
    const dateItem = new Date(`${anoItem}-${mesItem}-${diaItem}`);
    console.log(dateItem);

    //DataHoje
    const formatDateHoje = format(new Date(), 'dd/MM/yyyy');
    const [diaHoje, mesHoje, anoHoje] = formatDateHoje.split('/');
    const dataHoje = new Date(`${anoHoje}-${mesHoje}-${diaHoje}`);

    if(isBefore(dateItem, dataHoje)) {
      //Se a data do registro já passou vai entrar aqui
      alert('Você não pode excluir um registro antigo');
      return;
    }

    Alert.alert(
      'Excluir Despesa?',
      `Tipo: ${data.tipo}\nValor: ${data.valor}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleDeleteSuccess()
        }
      ]
    )
  }

  async function handleDeleteSuccess(data) {
    await remove(ref(db, 'historico/' + user.uid + '/' + data.key))
    .then(async () => {
      let saldoAtual = user.saldo;
      data.tipo === 'despesa' ? saldoAtual += parseFloat(data.valor)  : saldoAtual -= parseFloat(data.valor);

      await update(ref(db, 'users/' + user.uid), {
        saldo: saldoAtual
      })
      .then(() => {
        alert('Registro excluído com sucesso');
      })
    })
    .catch((error) => {
      alert(error.message);
    })
  }

  function handleShowPicker() {
    setShowDate(true);
  }

  function handleClose() {
    setShowDate(false);
  }

  const onChange = (date) => {
    setShowDate(Platform.OS === 'ios');
    setNewDate(date);
  }

  return (
    <BackGround>
      <Container>
        <Nome>{user && user.nome}</Nome>
        <Saldo>R$ {user && user.saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Saldo>
      </Container>

      <Area>
        <TouchableOpacity onPress={handleShowPicker}>
          <Icon name="event" size={30} color="#FFF" />
        </TouchableOpacity>
        <Title>Últimos lançamentos ({format(newDate, 'dd/mm/yy')})</Title>
      </Area>
      
      <List
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (<HistoricoList data={item} deleteItem={handleDelete} />)}
      />

      {showDate && (
        <DatePicker
          onClose={handleClose}
          date={newDate}
          onChange={onChange}
        />
      )}
    </BackGround>
  );
}
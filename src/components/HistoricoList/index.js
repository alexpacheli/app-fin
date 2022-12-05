import React from 'react';
import { View, Text } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import {Container, Tipo, IconView, TipoText, ValorText} from './styles';

export default function HistoricoList({data}) {
 return (
   <Container>
    <Tipo>
        <IconView tipo={data.tipo}>
            <Feather 
                name={data.tipo === 'despesa' ? 'arrow-down' : 'arrow-up'} 
                color="#FFF" size={20} 
            />
            <TipoText>{data.tipo}</TipoText>
        </IconView>
    </Tipo>
    <ValorText>
        R$ {data.valor.toFixed(2)}
    </ValorText>
   </Container>
  );
}
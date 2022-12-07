import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import { Container, Tipo, IconView, TipoText, ValorText, TipoTextDate, DateView } from './styles';

export default function HistoricoList({ data, deleteItem }) {
    return (
        <TouchableWithoutFeedback onLongPress={() => deleteItem(data)}>
            <Container>
                <Tipo>
                    <IconView tipo={data.tipo}>
                        <Feather
                            name={data.tipo === 'despesa' ? 'arrow-down' : 'arrow-up'}
                            color="#FFF" size={20}
                        />
                        <TipoText>{data.tipo}</TipoText>
                    </IconView>
                    <DateView>
                        <TipoTextDate>{data.date}</TipoTextDate>
                    </DateView>
                </Tipo>
                <ValorText>
                    R$ {data.valor.toFixed(2)}
                </ValorText>
            </Container>
        </TouchableWithoutFeedback>

    );
}
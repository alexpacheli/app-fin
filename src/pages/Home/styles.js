import styled from "styled-components/native";

export const BackGround = styled.View`
flex: 1;
background-color: #131313;
`;

export const Container = styled.View`
margin-left: 15px;
margin-bottom: 25px;
margin-top: 30px;
`;

export const Nome = styled.Text`
font-size: 19px;
color: #fff;
font-style: italic;
`;

export const Saldo = styled.Text`
margin-top: 5px;
font-size: 30px;
color: #fff;
font-weight: bold;
`;

export const Title = styled.Text`
margin-left: 5px;
color: #00b94a;
font-size: 15px;
`;

export const List = styled.FlatList.attrs({
    marginHorizontal: 15
})`
background-color: #FFF;
border-top-left-radius: 15px;
border-top-right-radius: 15px;
margin-left: 8px;
margin-right: 8px;
`;

export const Area = styled.View`
flex-direction: row;
margin-left: 15px;
align-items: center;
margin-bottom: 5px;
`;
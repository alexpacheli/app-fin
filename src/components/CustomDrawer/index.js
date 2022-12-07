import React, { useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

export default function CustomDrawer(props) {
    const { user, signOutFb } = useContext(AuthContext);

    return (
        <DrawerContentScrollView {...props}>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
                <Image
                    source={require('../../assets/Logo.png')}
                    style={{ width: 85, height: 85 }}
                    resizeMode="contain"
                />
                <Text style={{ color: '#FFF', fontSize: 18, marginTop: 5 }}>
                    Bem-vindo
                </Text>
                <Text style={{ color: '#FFF', fontSize: 17, fontWeight: 'bold', paddingBottom: 25 }}>
                    {user && user.nome}
                </Text>
            </View>

            <DrawerItemList 
                {...props}     
            />
            <DrawerItem 
                {...props} 
                label="Sair"
                inactiveBackgroundColor='#c62c36'
                inactiveTintColor='#FFF'
                onPress={() => signOutFb()}
            />
        </DrawerContentScrollView>

    );
}
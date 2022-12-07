
import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from "../pages/Home";
import Profile from "../pages/Profile";
import New from "../pages/New";
import CustomDrawer from "../components/CustomDrawer";

const AppDrawer = createDrawerNavigator();

function AppRoutes() {
    return (
        <AppDrawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#131313'
                },
                headerTintColor: '#FFF',
                drawerStyle: {
                    backgroundColor: '#171717',
                },
                drawerItemStyle: {
                    marginVertical: 5
                },
                drawerActiveTintColor: '#FFF',
                drawerActiveBackgroundColor: '#00b94a',
                drawerInactiveBackgroundColor: '#000',
                drawerInactiveTintColor:'#ddd',
            }}
        >
            <AppDrawer.Screen 
                name="Home" 
                component={Home}
                options={{
                    headerTitle: 'Home',
                }}    
            />
            <AppDrawer.Screen 
                name="Registrar" 
                component={New} 
                options={{
                    headerTitle: 'Registrar',
                }}       
            />
            <AppDrawer.Screen 
                name="Perfil" 
                component={Profile} 
                options={{
                    headerTitle: 'Perfil',
                }}    
            />
            
        </AppDrawer.Navigator>
    )
}

export default AppRoutes;
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../features/Home';
import ProductAdd from '../features/Product/productAdd';
import ProductPhotoAdd from '../features/ProductPhoto';  
import PropertyTypeAdd from '../features/PropertyTypeAdd'; 
import TableAdd from '../features/TableAdd';
import CategoryAdd from '../features/CategoryAdd';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="ProductAdd" component={ProductAdd} />
            <Drawer.Screen name="ProductPhotoAdd" component={ProductPhotoAdd} />
            <Drawer.Screen name="PropertyTypeAdd" component={PropertyTypeAdd} />
            <Drawer.Screen name="TableAdd" component={TableAdd} />
            <Drawer.Screen name="CategoryAdd" component={CategoryAdd} />
        </Drawer.Navigator>
    );
}
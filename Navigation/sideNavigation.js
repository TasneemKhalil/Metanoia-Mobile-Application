
import { createDrawerNavigator } from '@react-navigation/drawer';

import SchedulePage from '../screens/SchedulePage';
import ProfilePage from '../screens/ProfilePage';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './mainNavigation';
import CustonDrawer from '../screens/CustonDrawer';
import Bookmarks from '../screens/Bookmarks';
import AllProjects from '../screens/AllProjects';
import Project from '../screens/Project';
import RecentlyViewed from '../screens/RecentlyViewed';
import { AntDesign } from '@expo/vector-icons';
import COLORS from '../conts/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

export default function SideNavigation() {
  return (
      <Drawer.Navigator 
        drawerContent={props => <CustonDrawer {...props} />} 
        screenOptions={{
          headerShown:false, 
          drawerActiveBackgroundColor:COLORS.A_dark_blue,
          drawerActiveTintColor:'#fff',
          drawerInactiveTintColor:'#333',
          drawerLabelStyle:{marginLeft:-25,}}}
      >

        <Drawer.Screen name="Home" component={MainNavigation} 
          options={{
            drawerIcon: ({color}) =>(
              <Entypo name="home" size={22} color={color} />
              // <AntDesign name="home" size={22} color={color} style={{marginLeft:0}}/>
            )
          }}
        />


        <Drawer.Screen name="Projects" component={AllProjects} 
          options={{
            drawerIcon: ({color}) =>(
              <MaterialIcons name="folder" size={22} color={color} />
            )
          }}
        />

        <Drawer.Screen name="Bookmarks" component={Bookmarks} 
        options={{
            drawerIcon: ({color}) =>(
              <MaterialIcons name="folder-special" size={22} color={color}/>
            )
          }}
        />

        <Drawer.Screen name="Recently Opened" component={RecentlyViewed} 
          options={{
            drawerIcon: ({color}) =>(
              <MaterialIcons name="folder" size={22} color={color} />
            )
          }}
        />
      </Drawer.Navigator>
  );
}
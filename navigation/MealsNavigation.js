import React from 'react';
import { Text, Dimensions } from 'react-native';
import { Platform, View, SafeAreaView, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
// Screens
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScren from '../screens/FavoritesScreen';
import SearchScreen from '../screens/SearchScreen';
import AddMealScreen from '../screens/AddMealScreen';
import StartupScreen from '../screens/StartupScreen';
import SignOutScreen from '../screens/SignOutScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
// Navigation
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from 'react-navigation-drawer';

import SideBar from '../components/SideBar';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },

  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
};

const MealsNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    CategoryMeals: {
      screen: CategoryMealsScreen,
    },
    MealDetail: MealDetailScreen,
    AddMeal: AddMealScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const FavNavigator = createStackNavigator(
  {
    Favorites: {
      screen: FavoritesScren,
      // navigationOptions: {
      //   headerStyle: {
      //     backgroundColor: Colors.primary,
      //   },
      // },
    },
    MealDetail: MealDetailScreen,
  },
  {
    // defaultNavigationOptions: defaultStackNavOptions,
    defaulfNavigationOptions: ({ navigation }) => ({
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1,
      },
    }),
  }
);
import * as authActions from '../store/actions/auth';

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={{ fontFamily: 'open-sans-bold' }}>Meals</Text>
        ) : (
          'Meals'
        ),
    },
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={{ fontFamily: 'open-sans-bold' }}>Favorites</Text>
        ) : (
          'Favorites'
        ),
    },
  },
};

const MealsFavTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: 'white',
        shifting: true,
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: 'open-sans-bold',
          },
          activeTintColor: 'white',
        },
      });

const SearchNavigator = createStackNavigator(
  {
    Search: SearchScreen,
  },
  {
    defaultNavigationOptions: {
      ...defaultStackNavOptions,
      // headerStyle: {
      //   backgroundColor: 'grey,
      // },
    },
  }
);

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const AuthNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

// const DrawerNavigator = createDrawerNavigator(
//   {
//     MealsFavs: {
//       screen: MealsFavTabNavigator,
//       navigationOptions: {
//         drawerLabel: 'Meals',
//       },
//     },
//     Search: SearchNavigator,
//   },
//   {
//     contentOptions: {
//       activeTintColor: Colors.secondaryColor,
//       labelStyle: {
//         fontFamily: 'open-sans-bold',
//       },
//     },
//     contentComponent: (props) => {
//       const dispatch = useDispatch();
//       return (
//         <View style={{ flex: 1, padding: 20 }}>
//           <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
//             <DrawerNavigatorItems {...props} />
//             <Button
//               title='Logout'
//               onPress={() => {
//                 dispatch(authActions.logout());
//                 props.navigation.navigate('Auth');
//               }}
//             />
//           </SafeAreaView>
//         </View>
//       );
//     },
//   }
// );

const DrawerNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        title: 'Meals',
        drawerIcon: ({ tintColor }) => (
          <Feather name='list' size={16} color={tintColor} />
        ),
      },
    },
    Search: {
      screen: SearchNavigator,
      navigationOptions: {
        title: 'Search',
        drawerIcon: ({ tintColor }) => (
          <Feather name='search' size={16} color={tintColor} />
        ),
      },
    },
    SignOut: {
      screen: SignOutScreen,
      navigationOptions: {
        title: 'Sign Out',
        drawerIcon: ({ tintColor }) => (
          <Feather name='log-out' size={16} color={tintColor} />
        ),
      },
    },
  },
  {
    contentComponent: (props) => <SideBar {...props} />,

    drawerWidth: Dimensions.get('window').width * 0.85,
    hideStatusBar: true,

    contentOptions: {
      activeBackgroundColor: 'rgba(212,118,207, 0.2)',
      activeTintColor: '#53115B',
      itemsContainerStyle: {
        marginTop: 16,
        marginHorizontal: 8,
      },
      itemStyle: {
        borderRadius: 4,
      },
    },
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  MainApp: DrawerNavigator,
});

export default createAppContainer(MainNavigator);

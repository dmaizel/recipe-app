import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StyleSheet,
  FlatList,
  View,
  TouchableHighlight,
  Image,
  Text,
  Alert,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { IoniconCustomHeaderButton } from '../components/HeaderButton';
import { categories } from '../data/temp-data';
import * as mealsActions from '../store/actions/meals';

const CategoriesScreen = ({ navigation }) => {
  let meals = useSelector((state) => state.meals.meals);
  const dispatch = useDispatch();
  useEffect(() => {
    (async function fetch() {
      try {
        await dispatch(mealsActions.fetchMeals());
        // meals = useSelector((state) => state.meals.meals);
      } catch (err) {
        Alert.alert(err.message);
      }
    })();
  }, [dispatch]);

  function getNumberOfRecipes(categoryId) {
    let count = 0;
    meals.map((data) => {
      if (data.categoryId === categoryId) {
        count++;
      }
    });
    return count;
  }

  const renderCategory = ({ item }) => (
    <TouchableHighlight
      underlayColor='rgba(73,182,77,1,0.9)'
      onPress={() =>
        navigation.navigate({
          routeName: 'CategoryMeals',
          params: {
            categoryId: item.id,
            categoryName: item.name,
          },
        })
      }
    >
      <View style={styles.categoriesItemContainer}>
        <Image style={styles.categoriesPhoto} source={{ uri: item.imgUrl }} />
        <Text style={styles.categoriesName}>{item.name}</Text>
        <Text style={styles.categoriesInfo}>{getNumberOfRecipes(item.id)}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

// const CategoriesScreen = ({ navigation }) => {
//   const renderGridItem = (itemData) => {
//     return (
//       <CategoryGridTile
//         title={itemData.item.title}
//         color={itemData.item.color}
//         onSelect={() => {
//           navigation.navigate({
//             routeName: 'CategoryMeals',
//             params: {
//               categoryId: itemData.item.id,
//             },
//           });
//         }}
//       />
//     );
//   };

//   return <FlatList data={CATEGORIES} renderItem={renderGridItem} />;
// };

CategoriesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Meal Categories',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={IoniconCustomHeaderButton}>
        <Item
          title='Menu'
          iconName='ios-menu'
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

const styles = StyleSheet.create({
  categoriesItemContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 215,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 20,
  },
  categoriesPhoto: {
    width: '100%',
    height: 155,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
  categoriesName: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginTop: 8,
  },
  categoriesInfo: {
    marginTop: 3,
    marginBottom: 5,
  },
});

export default CategoriesScreen;

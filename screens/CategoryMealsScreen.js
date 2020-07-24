// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { useSelector } from 'react-redux';
// import { categories } from '../data/temp-data';
// import MealList from '../components/MealList';
// import DefaultText from '../components/DefaultText';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';
// import { MaterialCustomHeaderButton } from '../components/HeaderButton';

// const CategoryMealsScreen = (props) => {
//   const catId = props.navigation.getParam('categoryId');

//   const availableMeals = useSelector((state) => state.meals.meals);
//   const displaydMeals = availableMeals.filter(
//     (meal) => meal.categoryId === catId
//   );

//   if (displaydMeals.length === 0) {
//     return (
//       <View style={styles.content}>
//         <DefaultText>No meals found, maybe check you filters?</DefaultText>
//       </View>
//     );
//   }

//   return <MealList listData={displaydMeals} navigation={props.navigation} />;
// };

// CategoryMealsScreen.navigationOptions = (navigationData) => {
//   const catId = navigationData.navigation.getParam('categoryId');
//   const selectedCategory = categories.find((cat) => cat.id === catId);

//   return {
//     headerTitle: selectedCategory.title,
//     headerRight: () => (
//       <HeaderButtons HeaderButtonComponent={MaterialCustomHeaderButton}>
//         <Item
//           title='Add'
//           iconName={'add-to-photos'}
//           onPress={() => {
//             navigationData.navigation.navigate({
//               routeName: 'AddMeal',
//             });
//           }}
//         />
//       </HeaderButtons>
//     ),
//   };
// };

// const styles = StyleSheet.create({
//   content: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default CategoryMealsScreen;

import React from 'react';
import { useSelector } from 'react-redux';
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { MaterialCustomHeaderButton } from '../components/HeaderButton';

const CategoryMealsScreen = (props) => {
  const { navigation } = props;
  const availableMeals = useSelector((state) => state.meals.meals);
  const favoriteMeals = useSelector((state) => state.meals.favoriteMeals);
  const catId = navigation.getParam('categoryId');

  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryId === catId
  );

  renderRecipes = ({ item }) => (
    <TouchableHighlight
      underlayColor='rgba(73,182,77,1,0.9)'
      onPress={() => {
        props.navigation.navigate({
          routeName: 'MealDetail',
          params: {
            categoryId: navigation.getParam('categoryId'),
            categoryName: navigation.getParam('categoryName'),
            item: item,
            mealId: item.id,
            mealTitle: item.title,
            isFav: favoriteMeals.some((meal) => meal.id === item.id),
          },
        });
      }}
    >
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.imgUrl[0] }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>
          {navigation.getParam('categoryName')}
        </Text>
      </View>
    </TouchableHighlight>
  );

  if (displayedMeals.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>No meals found, maybe check you filters?</DefaultText>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={displayedMeals}
        renderItem={renderRecipes}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam('categoryId');
  const selectedCategory = navigationData.navigation.getParam('categoryName');

  return {
    headerTitle: selectedCategory,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={MaterialCustomHeaderButton}>
        <Item
          title='Add'
          iconName={'add-to-photos'}
          onPress={() => {
            navigationData.navigation.navigate({
              routeName: 'AddMeal',
              params: {
                categoryId: catId,
              },
            });
          }}
        />
      </HeaderButtons>
    ),
  };
};

// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;

// 2 photos per width
const RecipeCard = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: RECIPE_ITEM_MARGIN,
    marginTop: 20,
    width:
      (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) /
      recipeNumColums,
    height: RECIPE_ITEM_HEIGHT + 75,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 15,
  },
  photo: {
    width:
      (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) /
      recipeNumColums,
    height: RECIPE_ITEM_HEIGHT,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444444',
    marginTop: 3,
    marginRight: 5,
    marginLeft: 5,
  },
  category: {
    marginTop: 5,
    marginBottom: 5,
  },
});

const styles = StyleSheet.create({
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
});

export default CategoryMealsScreen;

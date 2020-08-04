import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  Image,
  Dimensions,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { IoniconCustomHeaderButton } from '../components/HeaderButton';
import { ListItem, SearchBar } from 'react-native-elements';
import { categories } from '../data/temp-data';

const SearchScreen = (props) => {
  const [searchText, setSearchText] = useState('');
  const [mealsToDisplay, setMealsToDisplay] = useState([]);

  const meals = useSelector((state) => state.meals.meals);

  const getValue = () => {
    return searchText;
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight
      underlayColor='rgba(73,182,77,1,0.9)'
      onPress={() => {
        props.navigation.navigate({
          routeName: 'MealDetail',
          params: {
            categoryId: item.categoryId,
            categoryName: categories.find((cat) => cat.id === item.categoryId)
              .name,
            item: item,
            mealId: item.id,
            mealTitle: item.title,
            isFav: item.isFavorite,
          },
        });
      }}
    >
      <View style={styles.container}>
        <Image
          style={styles.photo}
          source={{
            uri: item.imgUrl ? item.imgUrl[0] : emptyImage,
          }}
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>
          {categories.find((cat) => cat.id === item.categoryId).name}
        </Text>
      </View>
    </TouchableHighlight>
  );

  const handleSearch = (text) => {
    var recipeArray1 = meals.filter((meal) => meal.title.includes(text));
    var recipeArray2 = meals.filter((meal) => {
      const categoryName = categories.find((cat) => cat.id === meal.categoryId)
        .name;
      return categoryName.includes(text);
    });
    var aux = recipeArray1.concat(recipeArray2);
    var recipeArray = [...new Set(aux)];
    if (text == '') {
      setSearchText('');
      setMealsToDisplay([]);
    } else {
      setSearchText(text);
      setMealsToDisplay(recipeArray);
    }
  };

  useEffect(() => {
    props.navigation.setParams({
      data: getValue,
      handleSearch: handleSearch,
    });
  }, []);

  return (
    <View style={styles.screen}>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={mealsToDisplay}
        renderItem={renderRecipes}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
};

SearchScreen.navigationOptions = (navData) => {
  console.log('NavigationOptions');
  let data, handleSearch;
  if (navData.navigation.state) {
    data = navData.navigation.getParam('data');
    handleSearch = navData.navigation.getParam('handleSearch');
  } else {
    console.log('Params not found');
    console.log('data=', data, 'handleSearch=', handleSearch);
  }
  console.log('data=', data, 'handleSearch=', handleSearch);

  return {
    headerTitle: () => (
      <SearchBar
        containerStyle={{
          backgroundColor: 'transparent',
          borderBottomColor: 'transparent',
          borderTopColor: 'transparent',
          flex: 1,
        }}
        inputContainerStyle={{
          backgroundColor: '#EDEDED',
        }}
        inputStyle={{
          backgroundColor: '#EDEDED',
          borderRadius: 10,
          color: 'black',
        }}
        searchIcond
        clearIcon
        //lightTheme
        round
        onChangeText={(text) => handleSearch(text)}
        placeholder='Search'
        value={data}
      />
    ),
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  screen: {
    flex: 1,
    backgroundColor: '#F4F5F7',
  },
});

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   title: {
//     fontFamily: 'open-sans-bold',
//     fontSize: 22,
//     margin: 20,
//     textAlign: 'center',
//   },
//   filterContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '80%',
//     marginVertical: 15,
//   },
// });

export default SearchScreen;

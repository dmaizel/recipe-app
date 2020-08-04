import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  Button,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../constants/Colors';
import * as mealsActions from '../store/actions/meals';
import { IoniconCustomHeaderButton } from '../components/HeaderButton';
import { categories } from '../data/temp-data';

const FavoritesScreen = (props) => {
  const favMeals = useSelector((state) => state.meals.meals).filter(
    (meal) => meal.isFavorite === true
  );

  const { navigation } = props;
  const catId = navigation.getParam('categoryId');
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const loadMeals = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(mealsActions.fetchMeals());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadMeals().then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener('willFocus', loadMeals);

    return () => {
      willFocusSub.remove();
    };
  }, [loadMeals]);

  const emptyImage =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAAHlBMVEX////O0NL19fbS1Nb5+fr8/PzZ29zt7u/p6uvg4uLkPrcHAAAC8klEQVR4nO3b7XKDIBRF0Sgi+P4vXG3UIH4zag6Zvf610zg55YoXxdcLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkGKrslXts4d9O9JE2dRXa3z57VQj2xS3qKtvJ+vdlK8ojEZCd1e+dgwlzsT6voCF+3a4VnljvqL+drrXWKGmNil2AiqchX1Abw9cBWfKVe/CNwLXiiHgxYcl4GNWAtrSeVemT/PiAa3vv6BPjVjLTTLh76rPtTH1K0qPYBXO/okJlQPaaW+T1m8pB4yb06R+SzigjZvTpCEUDljF/VfSWSgccN59p3xLAj7mQIn+WEB79hxcbGOFA87u0TTbB/CL1xHlgPFJuD2A7efNwnVEOWA7JqHthVS1MsbSASdFup2v7wrmf6S9mnj5YaIxOwvh4V8xCyIe8FX52pi62VsOjsU8a+fUA7bFZ6vdHrT8XFHiz+sHPGDSEkTTyS8EnC47oiLNNGAZfuGoIZgeIc+A1gT34mcPbSZFmmXAriaboRLni45JQ5NlwP+aHLqWhYdS4TFyDOjDv1x8ahp03RkGdGGM5aemQZHKBLRHAwbnXLn6UPHTdWcXMLjZXRi3+lR4LFKTWcDZvcQVY6LcAh7eiTEUaWYB/UakSH+gvAKe2mnyzpRVwHJvr8HEu+vOKeDsRumO/0OJBwy/19EJ9KP7tHZAZ4Km6/xWtu5YcgHDm7ddTY4/n5hAB91nlQO+a7If0pSteuoBw1XDuQk0j4DjmPn+vvWPBQwuCv78BCoY0E8DhquGIqU+1QNesb/ZjQ8Z9QImXBQWA6qOYNKkuRRQdATPdp3rATVHMHHSzCegL87tyN4IqFmi6zuwT3DOaa0mosvEVYf99YB6I+j3Su/kCwcyAQ+vh5LeGFnaQfO0tAXDQTubpJ5x29t1hcbLWXe+naXxet19LxAqbOT6565pQWO1Sr7uWnF9ROM06vPNbrwol2h/nxQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwqD/N9SBYljYRlQAAAABJRU5ErkJggg==';

  const renderRecipes = ({ item }) => (
    <TouchableHighlight
      underlayColor='rgba(73,182,77,1,0.9)'
      onPress={() => {
        props.navigation.navigate({
          routeName: 'MealDetail',
          params: {
            categoryId: navigation.getParam('categoryId'),
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

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error Occured! + {error}}</Text>
        <Button
          color={Colors.primary}
          title='Try again'
          onPress={() => {
            loadMeals;
          }}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && favMeals.length === 0) {
    return (
      <View style={styles.content}>
        <Text>No favorite meals found. Start adding some!</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        onRefresh={loadMeals}
        refreshing={isRefreshing}
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={favMeals}
        renderItem={renderRecipes}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
};

FavoritesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Favorites',
    headerStyle: {
      backgroundColor: Colors.primaryColor,
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
      alignSelf: 'center',
      flex: 1,
      right: 40,
    },

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

export default FavoritesScreen;

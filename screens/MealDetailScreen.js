import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { IoniconCustomHeaderButton } from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { toggleFavorite } from '../store/actions/meals';

import ImageView from 'react-native-image-viewing';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText style={styles.textContent}>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = (props) => {
  const availableMeals = useSelector((state) => state.meals.meals);
  const mealId = props.navigation.getParam('mealId');
  const currentMealIsFavorite = useSelector((state) =>
    state.meals.favoriteMeals.some((meal) => meal.id === mealId)
  );
  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);

  const [visible, setIsVisible] = useState(false);

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentMealIsFavorite });
  }, [currentMealIsFavorite]);

  const images = selectedMeal.imgUrl.map((uri) => {
    return { uri };
  });

  return (
    <ScrollView style={styles.screen}>
      <TouchableOpacity onPress={() => setIsVisible(true)}>
        <Image source={{ uri: selectedMeal.imgUrl[0] }} style={styles.image} />
      </TouchableOpacity>
      <ImageView
        images={images}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />

      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map((ingredient) => (
        <View style={styles.ingredient} key={ingredient}>
          <Ionicons name='md-checkmark' size={24} color={Colors.primaryColor} />
          <ListItem>{ingredient}</ListItem>
        </View>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step, index) => (
        <View style={styles.step} key={step}>
          <View style={styles.circle}>
            <Text style={styles.number}>{index + 1}</Text>
          </View>
          <ListItem>{step}</ListItem>
        </View>
      ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  const toggleFavorite = navigationData.navigation.getParam('toggleFav');
  const isFavorite = navigationData.navigation.getParam('isFav');

  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={IoniconCustomHeaderButton}>
        <Item
          title='Favorite'
          iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {},
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 20,
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    flexGrow: 1,
    flex: 1,
  },
  step: {
    flexDirection: 'row',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingVertical: 15,
  },
  ingredient: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    alignItems: 'center',
    paddingLeft: 10,
  },
  circle: {
    marginLeft: 10,
    padding: 10,
    height: 30,
    width: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: Colors.primaryColor,
    marginVertical: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  number: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'open-sans-bold',
  },
  textContent: {
    fontSize: 16,
  },
});

export default MealDetailScreen;

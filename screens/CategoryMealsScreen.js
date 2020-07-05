import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { MaterialCustomHeaderButton } from '../components/HeaderButton';

const CategoryMealsScreen = (props) => {
  const catId = props.navigation.getParam('categoryId');

  const availableMeals = useSelector((state) => state.meals.filteredMeals);

  const displaydMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );

  if (displaydMeals.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>No meals found, maybe check you filters?</DefaultText>
      </View>
    );
  }

  return <MealList listData={displaydMeals} navigation={props.navigation} />;
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

  return {
    headerTitle: selectedCategory.title,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={MaterialCustomHeaderButton}>
        <Item
          title='Add'
          iconName={'add-to-photos'}
          onPress={() => {
            navigationData.navigation.navigate({
              routeName: 'AddMeal',
            });
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CategoryMealsScreen;

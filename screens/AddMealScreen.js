import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Text,
  ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import ImagePicker from '../components/ImagePicker';
import * as actions from '../store/actions/meals';

import IngredientInput from '../components/IngredientInput';
import StepInput from '../components/StepInput';
import Step from '../components/Step';
import Ingredient from '../components/Ingredient';

import Colors from '../constants/Colors';

import { Col, Row, Grid } from 'react-native-easy-grid';

const Steps = (props) => {
  return (
    <View>
      {props.meal.steps.map((step, i) => (
        <Step
          index={i + 1}
          onPress={() => {
            props.setMeal((prevMeal) => ({
              ...prevMeal,
              steps: prevMeal.steps.filter((stepItem) => stepItem != step),
            }));
          }}
          step={step}
        />
      ))}
    </View>
  );
};

const Ingredients = (props) => {
  return (
    <View>
      {props.meal.ingredients.map((ingredient) => (
        <Ingredient
          onPress={() => {
            props.setMeal((prevMeal) => ({
              ...prevMeal,
              ingredients: prevMeal.ingredients.filter(
                (ingredientItem) => ingredientItem != ingredient
              ),
            }));
          }}
          ingredient={ingredient}
        />
      ))}
    </View>
  );
};

const AddMealScreen = (props) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [meal, setMeal] = useState({
    id: '',
    categoryIds: ['c2'],
    title: '',
    affordability: '',
    complexity: '',
    imgUrl: [],
    duration: '',
    ingredients: [],
    steps: [],
    isGlutenFree: false,
    isVegan: false,
    isVegetarian: false,
    isLactoseFree: false,
  });

  const dispatch = useDispatch();

  const imageTakenHandler = (imagePath) => {
    setSelectedImages((oldSelectedImages) => [...oldSelectedImages, imagePath]);
  };

  const saveMealHandler = () => {
    let newMeal = { ...meal };
    newMeal = { ...newMeal, imgUrl: selectedImages };
    dispatch(actions.addMeal(newMeal));
    props.navigation.goBack();
  };

  const handleIngredientSubmit = (ingredient, setIngredient) => {
    setMeal((prevMeal) => ({
      ...prevMeal,
      ingredients: prevMeal.ingredients.concat(ingredient),
    }));
    setIngredient('');
  };

  const handleStepSubmit = (step, setStep) => {
    setMeal((prevMeal) => ({
      ...prevMeal,
      steps: prevMeal.steps.concat(step),
    }));
    setStep('');
  };

  return (
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.formFields}>
          <TextInput
            style={styles.formField}
            placeholder='Title'
            value={meal.title}
            onChangeText={(newTitle) => {
              setMeal({ ...meal, title: newTitle });
            }}
          />
          <Grid>
            <Col size={50} style={{}}>
              <ImagePicker onImageTaken={imageTakenHandler} />
            </Col>
            <Col size={25}>
              <Row>
                <ImagePicker onImageTaken={imageTakenHandler} />
              </Row>
              <Row>
                <ImagePicker onImageTaken={imageTakenHandler} />
              </Row>
            </Col>
            <Col size={25}>
              <Row>
                <ImagePicker onImageTaken={imageTakenHandler} />
              </Row>
              <Row>
                <ImagePicker onImageTaken={imageTakenHandler} />
              </Row>
            </Col>
          </Grid>
          {/* <View style={styles.imagesGrid}>
            <ImagePicker onImageTaken={imageTakenHandler} />
            <View style={styles.smallImages}>
              <ImagePicker
                style={styles.smallImage}
                onImageTaken={imageTakenHandler}
              />
              <ImagePicker
                style={styles.smallImage}
                onImageTaken={imageTakenHandler}
              />
              <ImagePicker
                style={styles.smallImage}
                onImageTaken={imageTakenHandler}
              />
              <ImagePicker
                style={styles.smallImage}
                onImageTaken={imageTakenHandler}
              />
            </View>
          </View> */}
          <TextInput
            style={styles.formField}
            placeholder='Affordability'
            value={meal.affordability}
            onChangeText={(newAffordability) => {
              setMeal({ ...meal, affordability: newAffordability });
            }}
          />
          <TextInput
            style={styles.formField}
            placeholder='Complexity'
            value={meal.complexity}
            onChangeText={(newComplexity) => {
              setMeal({ ...meal, complexity: newComplexity });
            }}
          />
          <TextInput
            style={styles.formField}
            placeholder='Duration'
            value={meal.duration}
            onChangeText={(newDuration) => {
              setMeal({ ...meal, duration: newDuration });
            }}
          />
          <Text style={styles.ingredientsTitle}>Ingredients:</Text>
          <Ingredients meal={meal} setMeal={setMeal} />
          <IngredientInput onPress={handleIngredientSubmit} />
          <Text style={styles.stepsTitle}>Steps:</Text>
          {/* {meal.steps.map((step, index) => (
            <View style={styles.step} key={step}>
              <View style={styles.circle}>
                <Text style={styles.number}>{index + 1}</Text>
              </View>
              <ListItem>{step}</ListItem>
            </View>
          ))} */}
          <Steps meal={meal} setMeal={setMeal} />
          <StepInput onPress={handleStepSubmit} index={meal.steps.length + 1} />
        </View>
        <View style={styles.saveBtn}>
          <Button
            title='Save My Recipe'
            color={Colors.secondaryColor}
            onPress={saveMealHandler}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtn: {
    marginBottom: 10,
  },
  formField: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    margin: 5,
    padding: 10,
  },
  formFields: {
    width: '95%',
    justifyContent: 'flex-start',
    flexGrow: 1,
  },
  imageContainer: {},
  ingredientsTitle: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: 'green',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    marginHorizontal: 80,
    paddingVertical: 10,
  },
  stepsTitle: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: 'aqua',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    marginHorizontal: 80,
    paddingVertical: 10,
  },
  step: {
    flexDirection: 'row',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingVertical: 15,
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
  smallImage: {},
  smallImages: {},
});

export default AddMealScreen;

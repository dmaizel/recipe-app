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
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

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

const EditMealScreen = (props) => {
  const mealToEdit = props.meal;
  const [selectedImages, setSelectedImages] = useState(mealToEdit.imgUrl);
  const copyOfSelectedImages = [...selectedImages];
  const [meal, setMeal] = useState({
    id: mealToEdit.id,
    categoryId: mealToEdit.categoryId,
    title: mealToEdit.title,
    imgUrl: mealToEdit.imgUrl,
    duration: mealToEdit.duration,
    ingredients: mealToEdit.ingredient,
    steps: mealToEdit.steps,
  });

  const dispatch = useDispatch();

  const imageTakenHandler = (imagePath) => {
    setSelectedImages((oldSelectedImages) => [...oldSelectedImages, imagePath]);
  };

  const onImageRemoved = (imgUri) => {
    setSelectedImages(selectedImages.filter((image) => image !== imgUri));
  };

  const saveMealHandler = () => {
    let newMeal = { ...meal };
    dispatch(actions.editMeal(newMeal, props));
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
    <ScrollView keyboardShouldPersistTaps={'handled'}>
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
              <ImagePicker
                onImageTaken={imageTakenHandler}
                onImageRemoved={onImageRemoved}
                pickedImage={copyOfSelectedImages.pop()}
              />
            </Col>
            <Col size={25}>
              <Row>
                <ImagePicker
                  onImageTaken={imageTakenHandler}
                  onImageRemoved={onImageRemoved}
                  pickedImage={copyOfSelectedImages.pop()}
                />
              </Row>
              <Row>
                <ImagePicker
                  onImageTaken={imageTakenHandler}
                  onImageRemoved={onImageRemoved}
                  pickedImage={copyOfSelectedImages.pop()}
                />
              </Row>
            </Col>
            <Col size={25}>
              <Row>
                <ImagePicker
                  onImageTaken={imageTakenHandler}
                  onImageRemoved={onImageRemoved}
                  pickedImage={copyOfSelectedImages.pop()}
                />
              </Row>
              <Row>
                <ImagePicker
                  onImageTaken={imageTakenHandler}
                  onImageRemoved={onImageRemoved}
                  pickedImage={copyOfSelectedImages.pop()}
                />
              </Row>
            </Col>
          </Grid>
          {/* <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 30,
              marginTop: 20,
              width: '70%',
              alignSelf: 'center',
            }}
          >
            <Ionicons name='ios-timer' size={32} color='grey' />
            <Text
              style={{
                fontWeight: 'bold',
                marginLeft: 10,
                paddingVertical: 15,
              }}
            >
              Add Cooking Time
            </Text>
          </TouchableOpacity> */}
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
  bigCircle: {
    marginLeft: 10,
    paddingLeft: 4.5,
    height: 30,
    width: 30,
    borderRadius: 30,
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

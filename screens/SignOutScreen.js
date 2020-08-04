import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as authActions from '../store/actions/auth';

const SignOutScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.logout());
  }, []);

  return <ActivityIndicator size='large' />;
};

export default SignOutScreen;

const styles = StyleSheet.create({});

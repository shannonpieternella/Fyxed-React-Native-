import axios from 'axios';
import React, { useState, useEffect } from 'react';
  import { StyleSheet, View } from 'react-native';
  import { MultiSelect } from 'react-native-element-dropdown';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import {fetchAllNfts, filterNfts, fetchSearchNfts,fetchFilterStad} from '../src/endpoints'
  import {useSelector, useDispatch} from 'react-redux';
  import configureStore from '../src/store';
  import {SetStadFilter} from "../src/store/actions/app.actions";

  const store = configureStore();


  const data = [
    { label: 'Arnhem', value: 'Arnhem' },
    { label: 'Amsterdam', value: 'Amsterdam' },
    { label: 'Den-haag', value: 'Den-haag' },
    { label: 'Rotterdam', value: 'Rotterdam' },
  ];

  const MultiSelectComponent = () => {
    const [selected, setSelected] = useState([]);
    const {stadSearch} = useSelector(({appReducer}) => appReducer);

    const dispatch = useDispatch();

    useEffect(async() => {
      
      dispatch(SetStadFilter(selected)) // sends selected to store
      // console.log("Selected 1 " + selected)
      
      // console.log("Selected 2" + stadSearch)
      
    }, [selected])
    

    return (
      <View style={styles.container}>
        <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          search
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Selecteer stad"
          searchPlaceholder="Search..."
          value={selected}
          onChange={item => {
            setSelected(item);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
          selectedStyle={styles.selectedStyle}
        />
      </View>
    );
  };

  export default MultiSelectComponent;

  const styles = StyleSheet.create({
    container: { padding: 16 },
    dropdown: {
      height: 50,
      backgroundColor: 'transparent',
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
      width: 250,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 14,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    icon: {
      marginRight: 5,
    },
    selectedStyle: {
      borderRadius: 12,
    },
  });
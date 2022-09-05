import React, { useState, useEffect } from 'react';
  import { StyleSheet, Text, View } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import {useSelector, useDispatch} from 'react-redux';
  import configureStore from '../src/store';
  import {SetStadFilter} from "../src/store/actions/app.actions";

  const store = configureStore();

  const data = [
    { label: 'Amsterdam', value: 'Amsterdam' },
    { label: 'Rotterdam', value: 'Rotterdam' },
    { label: 'Utrecht', value: 'Utrecht' },
    { label: 'Den Haag', value: 'Den Haag' },
    { label: 'Eindhoven', value: 'Eindhoven' },
    { label: 'Groningen', value: 'Groningen' },
    { label: 'Tilburg', value: 'Tilburg' },
    { label: 'Almere', value: 'Almere' },
    { label: 'Breda', value: 'Breda' },
    { label: 'Nijmegen', value: 'Nijmegen' },
    { label: 'Apeldoorn', value: 'Apeldoorn' },
    { label: 'Arnhem', value: 'Arnhem' },
    { label: 'Haarlem', value: 'Haarlem' },
    { label: 'Enschede', value: 'Enschede' },
    { label: 'S-Hertogenbos', value: 'S-Hertogenbos' },
    { label: 'Zaandam', value: 'Zaandam' },
    { label: 'Amersfoort', value: 'Amersfoort' },
    { label: 'Zwolle', value: 'Zwolle' },
    { label: 'Leeuwarden', value: 'Leeuwarden' },
    { label: 'Zoetermeer', value: 'Zoetermeer' },
    { label: 'Leiden', value: 'Leiden' },
    { label: 'Maarstricht', value: 'Maarstricht' },
    { label: 'Ede', value: 'Ede' },
    { label: 'Dordrecht', value: 'Dordrecht' },
    { label: 'Alphen aan den Rijn', value: 'Alphen aan den Rijn' },
    { label: 'Alkmaar', value: 'Alkmaar' },
    { label: 'Emmen', value: 'Emmen' },
    { label: 'Delft', value: 'Delft' },
    { label: 'Utrecht', value: 'Utrecht' },
    { label: 'Venlo', value: 'Venlo' },
    { label: 'Deventer', value: 'Deventer' },
  ];

  const DropdownComponent = () => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const {stadSearch} = useSelector(({appReducer}) => appReducer);

    const dispatch = useDispatch();

    const renderLabel = () => {

    

    useEffect(async() => {
      
      dispatch(SetStadFilter(value)) // sends selected to store
      console.log("Selected 1 " + value)
      
      // console.log("Selected 2" + stadSearch)
      
    }, [value])


      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'black' }]}>
            Zoek
          </Text>
        );
      }
      return null;
    };

    return (
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Stad' : '...'}
          searchPlaceholder="Zoek..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
     
     
     
      width: 150,
      
    },
    dropdown: {
      height: 50,
      // borderColor: 'black',
      // borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingLeft: 25,
      width: '100%',
     
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });
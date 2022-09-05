import React from 'react';
import { VStack, FormControl, Input, NativeBaseProvider, Center, Button} from 'native-base';

function BuildingAFormExample() {
    const [formData, setData] = React.useState({});
    const [errors, setErrors] = React.useState({});
  
    const validate = () => {
      if (formData.name === undefined) {
        setErrors({ ...errors,
          Bedrijfsnaam: 'Name is required'
        });
        return false;
      } else if (formData.name.length < 3) {
        setErrors({ ...errors,
          Bedrijfsnaam: 'Name is too short'
        });
        return false;
      }
  
      return true;
      
    };
  
    const onSubmit = () => {
      true ? console.log('Submitted', formData): console.log('Validation Failed');
    };
  
    return <VStack  style={{justifyContent: 'space-between', height: 400, alignItems:'center'}} width="90%" mx="3" maxW="300px">
        <FormControl style={{height: 45, width: 310  }}   isRequired isInvalid={'name' in errors}>
          {/* <FormControl.Label _text={{
          bold: true
        }}>Bedrijfsnaam</FormControl.Label> */}
          <Input placeholder="Bedrijfsnaam" placeholderTextColor="black" onChangeText={value => setData({ ...formData,
          Bedrijfsnaam: value
        })} />
          {'Bedrijfssnaam' in errors ? <FormControl.ErrorMessage>Error</FormControl.ErrorMessage> : <FormControl.HelperText>
               {/* Naam moet tenminste 3 letters bevatten.  */}
            </FormControl.HelperText>}
        </FormControl>
        <FormControl style={{height: 45, width: 310}}  isRequired isInvalid={'telefoonnummer' in errors}>
          {/* <FormControl.Label _text={{
          bold: true
        }}>Telefoonnummer</FormControl.Label> */}
          <Input placeholder="Telefoonnummer" placeholderTextColor="black" onChangeText={value => setData({ ...formData,
          Telefoonnummer: value
        })} />
          {'Telefoonnummer' in errors ? <FormControl.ErrorMessage>Error</FormControl.ErrorMessage> : <FormControl.HelperText>
              {/* Naam moet tenminste 3 letters bevatten. */}
            </FormControl.HelperText>}
        </FormControl>

        <FormControl style={{height: 45, width: 310}} isRequired isInvalid={'Postcode' in errors}>
          {/* <FormControl.Label _text={{
          bold: true
        }}>Postcode</FormControl.Label> */}
          <Input placeholder="Postcode" placeholderTextColor="black" onChangeText={value => setData({ ...formData,
          postcode: value
        })} />
          {'Postcode' in errors ? <FormControl.ErrorMessage>Error</FormControl.ErrorMessage> : <FormControl.HelperText>
              {/* Naam moet tenminste 3 letters bevatten. */}
            </FormControl.HelperText>}
        </FormControl>

        <FormControl style={{height: 45, width: 310}} isRequired isInvalid={'Huisnummer' in errors}>
          {/* <FormControl.Label _text={{
          bold: true
        }}>Huisnummer</FormControl.Label> */}
          <Input placeholder="Huisnummer" placeholderTextColor="black" onChangeText={value => setData({ ...formData,
          huisnummer: value
        })} />
          {'Huisnummer' in errors ? <FormControl.ErrorMessage>Error</FormControl.ErrorMessage> : <FormControl.HelperText>
           {/* Naam moet tenminste 3 letters bevatten. */}
            </FormControl.HelperText>}
        </FormControl>

        <FormControl style={{height: 45, width: 310}} isRequired isInvalid={'Straatnaam' in errors}>
          {/* <FormControl.Label _text={{
          bold: true
        }}>Huisnummer</FormControl.Label> */}
          <Input placeholder="Straatnaam" placeholderTextColor="black" onChangeText={value => setData({ ...formData,
          straatnaam: value
        })} />
          {'Straatnaam' in errors ? <FormControl.ErrorMessage>Error</FormControl.ErrorMessage> : <FormControl.HelperText>
           {/* Naam moet tenminste 3 letters bevatten. */}
            </FormControl.HelperText>}
        </FormControl>

        <FormControl style={{height: 45, width: 310, borderBottomLeftRadius:16}}  isRequired isInvalid={'Plaats' in errors}>
          {/* <FormControl.Label _text={{
          bold: true
        }}>Huisnummer</FormControl.Label> */}
          <Input style={{borderBottomLeftRadius:30}} placeholder="Plaats" placeholderTextColor="black" onChangeText={value => setData({ ...formData,
          plaats: value
        })} />
          {'Plaats' in errors ? <FormControl.ErrorMessage>Error</FormControl.ErrorMessage> : <FormControl.HelperText>
           {/* Naam moet tenminste 3 letters bevatten. */}
            </FormControl.HelperText>}
        </FormControl>

       





        {/* <Button onPress={onSubmit} mt="5" colorScheme="cyan">
          Submit
        </Button> */}
      </VStack>;
  }
  
  function Example() {
    return <Center flex={1}>
        <BuildingAFormExample />
      </Center>;
  }

    export default () => {
        return (
          <NativeBaseProvider>
            <Center flex={1} px="3">
                <Example />
            </Center>
          </NativeBaseProvider>
        );
    };
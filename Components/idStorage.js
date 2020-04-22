import { AsyncStorage } from 'react-native';

const idStorage = {
    // our AsyncStorage functions will go here :)

    async saveItem(key, value) {
	    try {
	      await AsyncStorage.setItem(key, value);
	    //   console.log("saveItem ===================================================== ", key)
	    //   console.log("saveItem", value)
	    } catch (error) {
	      console.log('AsyncStorage Error: ' + error.message);
	    }
	},
	async retrieveItem(key) {
	  try {
	    const value = await AsyncStorage.getItem(key);
	    if (value !== null) {
	    //   console.log(" device Storage --------------------------------------------------------------- ", key)
	    //   console.log(value);
	    }
	    return value;
	  } catch (error) {
	    console.log('AsyncStorage Error: ' + error.message);
	  }
	}
};

export default idStorage;
import { AsyncStorage } from 'react-native';

const idStorage = {
    // our AsyncStorage functions will go here :)

    async saveItem(key, value) {
	    try {
	      await AsyncStorage.setItem(key, value);
	    } catch (error) {
	      console.log('AsyncStorage Error: ' + error.message);
	    }
	},
	async retrieveItem(key) {
	  try {
	    const value = await AsyncStorage.getItem(key);
	    if (value !== null) {
	    }
	    return value;
	  } catch (error) {
	    console.log('AsyncStorage Error: ' + error.message);
	  }
	}
};

export default idStorage;
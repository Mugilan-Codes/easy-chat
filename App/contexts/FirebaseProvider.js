import React, {
  createContext,
  useEffect,
  useState,
  useMemo,
  useContext,
} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const FirebaseContext = createContext();

const FirebaseProvider = ({children}) => {
  // Set an initializing state whilst Firebase connects
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState();

  console.log(`isLoading = ${isLoading}`);
  console.log(user);

  // Handle user state changes
  const onAuthStateChanged = user => {
    setUser(user);
    if (isLoading) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber; // unsubscribe on unmount
  }, []);

  // add additional information
  const register = async (email, password, name = 'test') => {
    try {
      const creds = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log(creds);
      console.log('User account created & signed in!');

      // update the authentication profile
      await auth().currentUser.updateProfile({displayName: 'Mugilan'});

      // create a document in firestore
      await firestore().collection('Users').doc(email).set({username: name});
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    }
  };

  const login = async (email, password) => {
    try {
      const creds = await auth().signInWithEmailAndPassword(email, password);
      console.log(creds);
      console.log('User signed in!');
    } catch (error) {
      // TODO: add error codes
      if (error.code === 'auth/user-not-found') {
        console.log('user not found');
      }

      console.error(error);
    }
  };

  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  const value = useMemo(
    () => ({
      user,
      isLoading,
      register,
      login,
      logout,
    }),
    [user, isLoading, register, login, logout],
  );

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
export default FirebaseProvider;

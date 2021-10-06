import React, {
  createContext,
  useEffect,
  useState,
  useMemo,
  useContext,
} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// FIXME: rename 'Firebase' to 'Auth'

const FirebaseContext = createContext();

const FirebaseProvider = ({children}) => {
  // Set an initializing state whilst Firebase connects
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState();

  // Handle user state changes
  const onAuthStateChanged = user => {
    setUser(user);
    if (isLoading) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return () => subscriber; // unsubscribe on unmount
  }, []);

  // add additional information
  const register = async (email, password, name) => {
    try {
      const creds = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log(creds);

      // update the authentication profile
      await auth().currentUser.updateProfile({
        displayName: name,
        photoURL: 'https://placeimg.com/140/140/any',
      });

      // create a document in firestore (use add instead of doc().set())
      await firestore().collection('Users').doc(email).set({
        username: name,
        email,
        avatar: 'https://placeimg.com/140/140/any',
        created_on: firestore.FieldValue.serverTimestamp(),
        updated_on: firestore.FieldValue.serverTimestamp(),
      });
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
    } catch (error) {
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

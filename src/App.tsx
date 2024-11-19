import './App.css'
import { Button, Container, Stack, Typography } from '@mui/material';
import { getAuth, GoogleAuthProvider, signInWithRedirect, signOut, User } from 'firebase/auth';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const typographyConfig = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  whileHover: { scale: 1.02 },
  transition: { duration: 0.1 },
  exit: { opacity: 0 },
  variant: "h2" as const,
  component: motion.div,
};

function App(firebaseApp: any) {
  const [textVisible, setTextVisible] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((currentUser: User | null) => {
      setUser(currentUser);
      console.log(`User state changed: ${currentUser}`);
      return unsubscribe;
    });
  }, [firebaseApp]);
  const signIn = async () => {
    await signInWithRedirect(getAuth(), new GoogleAuthProvider());
  };
  return (
    <Container>
      <Stack spacing={2}>
        <Button variant='contained' onClick={signIn}>Sign In</Button>
        <Button variant='contained' onClick={() => signOut(getAuth())}>Sign Out</Button>
        <Button variant='contained' onClick={() => console.log(user)}>Log User</Button>
        <Typography variant="body1">{user?.toString()}</Typography>
      </Stack>
      <AnimatePresence>
        {textVisible && <Typography {...typographyConfig}>Hello World</Typography>}
      </AnimatePresence>
      <Button component={motion.div} whileHover={{ scale: 1.05 }} variant='outlined' onClick={() => setTextVisible(!textVisible)}>Show Text</Button>
    </Container>
  );
}

export default App

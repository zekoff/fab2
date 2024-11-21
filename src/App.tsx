import './App.css'
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, User } from 'firebase/auth';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IAccount, IFamily } from './interfaces';
import fab_logo_circle from './assets/fab_logo_circle.png';

const devMode = import.meta.env.MODE === 'development';
const loginFunction = devMode ? signInWithPopup : signInWithRedirect;

const typographyConfig = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  whileHover: { scale: 1.1 },
  transition: { duration: 0.1 },
  exit: { scaleX: 0, scaleY: 0 },
  variant: "h2" as const,
  component: motion.div,
};

function useFamily() {
  const db = getFirestore();
  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<IAccount | null>(null);
  const [family, setFamily] = useState<IFamily | null>(null);
  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((currentUser: User | null) => {
      setUser(currentUser);
      console.log(`User state changed: ${currentUser}`);
    });
    return unsubscribe;
  }, []);
  useEffect(() => {
    if (!user) return;
    const unsubscribe = onSnapshot(doc(db, "accounts", user.uid), (doc) => {
      setAccount(doc.data() as IAccount);
    });
    return unsubscribe;
  }, [user]);
  useEffect(() => {
    if (!account) return;
    const unsubscribe = onSnapshot(doc(db, "families", account.familyId), (doc) => {
      setFamily(doc.data() as IFamily);
    });
    return unsubscribe;
  }, [account]);
  return family;
}

const signIn = async () => {
  await loginFunction(getAuth(), new GoogleAuthProvider());
};

function App() {
  const [textVisible, setTextVisible] = useState(true);
  const family = useFamily();
  return (
    <Container>
      <Stack spacing={2} alignItems='center'>
        <Box component='img' src={fab_logo_circle} sx={{ width: 200 }} alt='React Logo' />
        <Button variant='contained' onClick={signIn}>Sign In</Button>
        <Button variant='contained' onClick={() => signOut(getAuth())}>Sign Out</Button>
        <Button variant='contained' onClick={() => console.log(family)}>Log Family</Button>
      </Stack>
      <AnimatePresence>
        {textVisible && <Typography {...typographyConfig}>Hello World</Typography>}
      </AnimatePresence>
      <Button component={motion.div} whileHover={{ scale: 1.05 }} variant='outlined' onClick={() => setTextVisible(!textVisible)}>Show Text</Button>
    </Container>
  );
}

export default App

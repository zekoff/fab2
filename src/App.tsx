import './App.css'
import { Button, Container, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

function App() {
  const [textVisible, setTextVisible] = useState(true);
  return (
    <Container>
      <AnimatePresence>
        {textVisible && <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0 }}
        >
          <Typography variant="h2">Hello World</Typography>
        </motion.div>}
      </AnimatePresence>
      <Button onClick={() => setTextVisible(!textVisible)}>Show Text</Button>
    </Container>
  );
}

export default App

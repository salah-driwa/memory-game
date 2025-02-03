import { useEffect, useState } from 'react';
import './App.css';
import cardimage from './assets/images/card'; // Your images path
import SingleCard from './components/SingleCard';
import { motion } from 'framer-motion'; // Import motion from framer-motion

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Shuffle cards function
  const shuffleCards = () => {
    const shuffledCards = [...cardimage, ...cardimage] // Duplicate and shuffle
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
  };

  // Call shuffleCards when the component mounts (game starts directly)
  useEffect(() => {
    shuffleCards(); // Start the game directly
  }, []); // Empty dependency array ensures this runs once

  // Handle the card choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true); // Disable clicking while comparing
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiceOne.src
              ? { ...card, matched: true }
              : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000); // Reset after 1 second if they don't match
      }
    }
  }, [choiceOne, choiceTwo]);

  // Reset the turn (after a match or timeout)
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false); // Enable clicking again
  };

  return (
    <div className="App">
      {/* Adding Framer Motion to the heading */}
      <motion.h1 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
      >
        Tasty Match
      </motion.h1>

      {/* Adding Framer Motion to the shuffle button */}
      <motion.button 
        onClick={shuffleCards} 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
      >
        Shuffle
      </motion.button>

      {/* Grid for the cards */}
      <div className='card-grid'>
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handlechoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>

      {/* Adding Framer Motion to the turns text */}
      <motion.h2 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, delay: 0.5 }}
      >
        Turns: {turns}
      </motion.h2>
    </div>
  );
}

export default App;

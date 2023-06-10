import { useEffect, useState } from 'react';
import './App.css';
import cardimage from './assets/images/card'
import SingleCard from './components/SingleCard';

function App() {
  const[ cards,setcards] =useState([])
  const[ turns,setturns]=useState(0)
  const[choiseone,setchoiseone]=useState(null)
  const[choisetwo,setchoisetwo]=useState(null)
  const[disabled,setdisabled]=useState(false)

//shufflecards
  const shufflecards=() => {
    const shufflecards =[...cardimage,...cardimage]
      .sort(()=> Math.random()-0.5)
     .map((card)=> ({...card,id: Math.random()}))
     setcards(shufflecards)
     setturns(0)
     }
//handle choise

const handlechoice = (card) =>{
   choiseone ?  setchoisetwo(card):setchoiseone(card)
}
//compare 2  selected cards
useEffect(()=>{
 if(choiseone && choisetwo){
  setdisabled(true)
    if(choiseone.src=== choisetwo.src){
      setcards(prevcards =>{
        return prevcards.map(card =>{
          if (card.src === choiseone.src){
            return{...card, matched: true}  
          } else {
            return card
          }

        })
      })
      resetTurn()
    }
    else{
      setTimeout(()=>resetTurn(),1000)
    }
 }
},[choiseone,choisetwo])


//rest 
const resetTurn = ()=> {
  setchoiseone(null)
  setchoisetwo(null)
  setturns(prevTurns => prevTurns+1)
  setdisabled(false)
}


  return (
    <div className="App">
     <h1>Tasty Match </h1>
     <button onClick={shufflecards}>rest</button>
     
    <div className='card-grid'>
        {cards.map(card=>(
          <SingleCard
           key={card.id}
           card={card} 
           handlechoice={handlechoice}
           flipped={card === choiseone || card === choisetwo || card.matched}
           disabled={disabled}
           />
        ))}
    </div>

     <h2> turns: {turns}</h2>
    </div>
  );
}

export default App;

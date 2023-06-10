import backcard from '../assets/images/backcard.jpg'
import { motion } from 'framer-motion';
export default function SingleCard({card ,handlechoice,flipped,disabled}) {


     const handleclick = ()=>{
        if (!disabled){ 
             handlechoice(card)
            }}

  return (
    <div className='card' > 
      <div>
         <motion.img initial={{rotateY:180}} animate={{ rotateY: flipped ? 180 : 0  ,
         opacity: flipped ? 1 :0}}
         transition={{ duration: 0.5 }} 
         className='front'
         src={card.src} 
          alt="card front"/>

      <motion.img initial={{rotateY:0}}  animate={{ rotateY: flipped ? 0 : 180, opacity: flipped ? 0 :1 }}
      transition={{ duration: 0.5 }} className='back'
          src={backcard}
        onClick={handleclick} 
         alt="card cover"/>
     </div>
   </div>
  )
}

import React from 'react'
import styles from './Gameover.module.css'
import { useDispatch } from "react-redux";
import { clear, setPeople } from '../../../redux/people-reducer';

type PropsType = {
   player1Score: number
   player2Score: number
}

const Gameover: React.FC<PropsType> = ({ player1Score, player2Score }) => {
   let dispatch = useDispatch();
   let text: string = ""
   const onClearButtonClick = () => {
      dispatch(clear())
      dispatch(setPeople())
   }
   if (player1Score > player2Score) text = "Выиграл игрок 1"
   else if (player2Score > player1Score) text = "Выиграл игрок 2"
   else if (player1Score === player2Score) text = "Ничья"
   return (
      <div>
         <div className={styles.gameOverText}>Игра окончена.</div>
         <div className={styles.gameOverText}>{text}</div>
         <button onClick={() => {
            onClearButtonClick();
         }}
         >
            Начать заново?</button>
      </div>
   )
}

export default Gameover
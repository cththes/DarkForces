import React from 'react'
import styles from './Gameover.module.css'
import { useDispatch } from "react-redux";
import { clear, setPeople } from '../../../redux/people-reducer';

type PropsType = {
   player1Score: number
   player2Score: number
   cardNamesLength: number
}

const Gameover: React.FC<PropsType> = ({ player1Score, player2Score, cardNamesLength }) => {
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
         <div className={styles.gameOverText}>
            <div >Игра окончена.</div>
            <div>{cardNamesLength === 0 && "Закончились карты"}</div>
            <div>{text}</div>
         </div>
         <button onClick={() => {
            onClearButtonClick();
         }}
         >
            Начать заново?</button>
      </div>
   )
}

export default Gameover
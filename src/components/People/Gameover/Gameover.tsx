import React from 'react'
import styles from './Gameover.module.css'
import { useDispatch } from "react-redux";
import { clear, setPeople } from '../../../redux/people-reducer';

type PropsType = {
   playerCardSum: Array<Number>
}

const Gameover: React.FC<PropsType> = ({ playerCardSum }) => {
   let dispatch = useDispatch();
   let text: string = ""
   const onClearButtonClick = () => {
      dispatch(clear())
      dispatch(setPeople())
   }
   if (playerCardSum[0] > playerCardSum[1]) text = "Выиграл игрок 1"
   else if (playerCardSum[1] > playerCardSum[0]) text = "Выиграл игрок 2"
   else if (playerCardSum[0] === playerCardSum[1]) text = "Ничья"
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
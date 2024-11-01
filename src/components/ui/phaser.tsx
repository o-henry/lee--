import React, { useEffect } from 'react'

const PhaserGame = () => {
    useEffect(() => {
        // `window` 객체를 통해 번들된 Phaser 게임 접근
        if (window.Game) {
          new window.Game(); // Phaser 게임 실행
        }
      }, []);
    
      return <div id="game-container" />; 
};

export default PhaserGame;
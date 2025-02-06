import { Analysis } from './scenes/Analysis';
import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';
import { QrScanner } from './scenes/QrScanner';
import { ResultGame } from './scenes/ResultGame';
import { ScanAnalysis } from './scenes/ScanAnalysis';
import { TahukahExpert } from './scenes/TahukahExpert';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 1080,
    height: 1920,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game,
        QrScanner,
        ScanAnalysis,
        Analysis,
        ResultGame,
        TahukahExpert
    ],
    dom: {
        createContainer: true
    }
};

export default new Phaser.Game(config);

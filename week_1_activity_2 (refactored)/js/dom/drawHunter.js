import HunterReference from "../services/hunterService.js";
import DrawService from "./drawPrimary.js";


const DrawHunter = {

    start() {
        this.initHunterDomElement();
        this.drawHunter();
    },

    initHunterDomElement() {

        const hunterDomEl = DrawService.createCell('div', HunterReference.hunterObject.symbol, HunterReference.hunterObject.color);
        
        HunterReference.hunterObject.domElement = hunterDomEl;
    },

    drawHunter() {

        let cellToPlace         = DrawService.getCell(HunterReference.hunterObject.currentPosition[0], HunterReference.hunterObject.currentPosition[1]);
        cellToPlace.textContent = '';
        cellToPlace.appendChild(HunterReference.hunterObject.domElement);

        let emptyCell         = DrawService.getCell(HunterReference.hunterObject.prevPosition[0], HunterReference.hunterObject.prevPosition[1]);
        emptyCell.textContent = 'X';
    }


};

export default DrawHunter
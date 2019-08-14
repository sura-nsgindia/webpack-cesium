
//import Cesium from 'cesium/Cesium';
import appData from './appConfig';
var Cesium = require('cesium/Cesium');

let viewer = null;

class NSG3DMap {
    
    constructor(container, options) {
        
        Cesium.Ion.defaultAccessToken = appData.defaultAccessToken;

        viewer = new Cesium.Viewer(container, options);
    }

    getView(){
        return viewer;
    }

    static distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;

        return Math.hypot(dx, dy);
    }
}

export {NSG3DMap};
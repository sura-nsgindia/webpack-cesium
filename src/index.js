import appData from './js/appConfig';
import {Rectangle, Point} from './js/map';
//another way
//var appData = require('./js/appConfig');

console.log(appData);

var Cesium = require('cesium/Cesium');
require('./css/main.css');
require('cesium/Widgets/widgets.css');

Cesium.Ion.defaultAccessToken = appData.defaultAccessToken;

var viewer = new Cesium.Viewer('cesiumContainer');

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);

console.log(Point.distance(p1, p2)); // 7.0710678118654755

const square = new Rectangle(10, 10);

console.log(square.area); // 100
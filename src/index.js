import {NSG3DMap} from './js/map';
import Cesium from 'cesium/Cesium';
import {loadData} from './js/TestClassification';

require('./css/main.css');
require('cesium/Widgets/widgets.css');

var NSG3DViewer = new NSG3DMap('cesiumContainer');

const viewer = NSG3DViewer.getView();

loadData(viewer);

window.NSG3DViewer = NSG3DViewer;

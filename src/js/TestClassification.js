import Cesium from 'cesium/Cesium';

function loadData(viewer) {

    var tileset = new Cesium.Cesium3DTileset({
        url: Cesium.IonResource.fromAssetId(28945),
        skipLevelOfDetail: true,
        baseScreenSpaceError: 1024,
        skipScreenSpaceErrorFactor: 16,
        skipLevels: 1,
        immediatelyLoadDesiredLevelOfDetail: false,
        loadSiblings: false,
        cullWithChildrenBounds: true,
        maximumScreenSpaceError: 16.0,
        pointCloudShading: {
            maximumAttenuation: 4.0,
            baseResolution: 0.05,
            geometricErrorScale: 0.5,
            attenuation: true,
            eyeDomeLighting: true
        },
        //classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
    })

    viewer.scene.primitives.add(tileset);
   
    viewer.zoomTo(tileset)
        .otherwise(function (error) {
            console.log(error);
        });

    // Geometry Tiles are experimental and the format is subject to change in the future.
    // For more details, see:
    //    https://github.com/AnalyticalGraphicsInc/3d-tiles/tree/3d-tiles-next/TileFormats/Geometry
    /* var classificationTileset = new Cesium.Cesium3DTileset({
        url: 'data/PointCloud/tileset.json',
        classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
    });
    viewer.scene.primitives.add(classificationTileset);

    viewer.zoomTo(classificationTileset)
        .otherwise(function (error) {
            console.log(error);
        }); */

    // tileset.style = new Cesium.Cesium3DTileStyle({
    //     color: {
    //         conditions: [
    //             ["${Classification} === 2", "color('#004FFF', 1)"],
    //             //["${Classification} === 3", "color('#33BB66', 0.5)"],
    //             //["${Classification} === 4", "color('#0099AA', 0.5)"],
    //             //["${Classification} === 5", "color('#004FFF', 0.5)"],
    //             //["${Classification} === 6", "color('#FF8833', 0.5)"],
    //             ['true', "color('#FFFFFF', 0.5)"]
    //         ]
    //     },
    //     show : '${Classification} === 2',
    // });

    /*viewer.scene.camera.setView({
        destination: new Cesium.Cartesian3(4401744.644145314, 225051.41078911052, 4595420.374784433),
        orientation: new Cesium.HeadingPitchRoll(5.646733805039757, -0.276607153839886, 6.281110875400085)
    });*/

    // Information about the currently highlighted feature
    var highlighted = {
        feature: undefined,
        originalColor: new Cesium.Color()
    };

    // Color a feature yellow on hover.
    viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(movement) {
        // If a feature was previously highlighted, undo the highlight
        if (Cesium.defined(highlighted.feature)) {
            highlighted.feature.color = highlighted.originalColor;
            highlighted.feature = undefined;
        }

        // Pick a new feature
        var pickedFeature = viewer.scene.pick(movement.endPosition);
        if (!Cesium.defined(pickedFeature)) {
            return;
        }

        // Highlight the feature
        highlighted.feature = pickedFeature;
        Cesium.Color.clone(pickedFeature.color, highlighted.originalColor);
        pickedFeature.color = Cesium.Color.YELLOW.withAlpha(0.5);
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

}

export { loadData };
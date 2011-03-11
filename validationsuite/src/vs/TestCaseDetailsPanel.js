/**
 * @constructor
 */
jsts.vs.TestCaseDetailsPanel = Ext.extend(Ext.Panel, {
  initComponent: function() {

    this.layer = new OpenLayers.Layer.Vector();

    this.map = new GeoExt.MapPanel({
      map: {
        controls: [],
        maxResolution: 1000,
        layers: [this.layer]
      }
    });

    Ext.apply(this, {
      layout: 'absolute',
      items: [{
        x: 5,
        y: 5,
        height: 150,
        width: 150,
        frame: true,
        items: this.map
      }, {
        x: 170,
        y: 5,
        height: 150,
        width: 400,
        layout: 'fit',
        ref: 'geometry',
        frame: true
      }]
    });

    jsts.vs.TestCaseDetailsPanel.superclass.initComponent
        .apply(this, arguments);
  },
  map: null,
  layer: null,
  showTestCase: function(record) {

    var reader = new jsts.io.WKTReader();
    var writer = new jsts.io.WKTWriter();
    
    var a = reader.read(record.data.a);
    var featureA = new OpenLayers.Feature.Vector(a, null, { fillColor: 'red', strokeColor: 'red', graphicName: 'square', pointRadius: 2});

    var b = reader.read(record.data.b);
    var featureB = new OpenLayers.Feature.Vector(b, null, { fillColor: 'blue', strokeColor: 'blue', graphicName: 'square', pointRadius: 2});

    this.layer.destroyFeatures();
    this.layer.addFeatures([featureA, featureB]);

    var bounds = this.layer.getDataExtent();

    this.map.map.zoomToExtent(bounds);
    
    this.geometry.update(writer.write(a) + '<br><br>' + writer.write(b));
  }
});
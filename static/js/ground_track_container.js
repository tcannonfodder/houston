var GroundTrackContainer = Class.create({
  initialize: function(map_id, altitudeEstimationId){
    this.mapDatalink = new Telemachus(settings.getHost(), settings.getPort())
    this.mapDatalink.rate = 2000
    this.orbitalPositionData = new OrbitalPositionData(this.mapDatalink)
    this.groundTrackFormatter = new GroundTrackPositionDataFormatter(this.orbitalPositionData, this.mapDatalink)

    this.groundTrack = new GroundTrack(this.mapDatalink, this.groundTrackFormatter, map_id, altitudeEstimationId)
  }
})
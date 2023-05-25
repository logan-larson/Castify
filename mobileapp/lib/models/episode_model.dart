class EpisodeModel {
  String title;
  Duration duration;
  DateTime releaseDate;
  String audioUrl = '';
  String iconUrl = '';

  EpisodeModel(this.title, this.duration, this.releaseDate);
}

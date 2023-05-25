import 'package:flutter/material.dart';
import 'package:mobileapp/models/episode_model.dart';

class QueueEpisodeCard extends StatelessWidget {
  QueueEpisodeCard(this.episode);

  final EpisodeModel episode;

  String getMonthName(int month) {
    switch (month) {
      case 1:
        return 'Jan';
      case 2:
        return 'Feb';
      case 3:
        return 'Mar';
      case 4:
        return 'Apr';
      case 5:
        return 'May';
      case 6:
        return 'Jun';
      case 7:
        return 'Jul';
      case 8:
        return 'Aug';
      case 9:
        return 'Sep';
      case 10:
        return 'Oct';
      case 11:
        return 'Nov';
      case 12:
        return 'Dec';
      default:
        return 'Invalid month provided';
    }
  }

  String getHours(Duration d) {
    var hours = (d.inMinutes / 60).floor();
    return hours.toString();
  }

  String getMinutes(Duration d) {
    var hours = (d.inMinutes / 60).floor();
    var minutes = d.inMinutes - (hours * 60);
    return minutes.toString();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Card(
          elevation: 5,
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Flex(
              direction: Axis.horizontal,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Icon(Icons.podcasts),
                SizedBox(
                  width: 10,
                ),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        episode.title,
                        textAlign: TextAlign.left,
                        style: TextStyle(fontSize: 20),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          Text(
                              '${getMonthName(episode.releaseDate.month)} ${episode.releaseDate.day}, ${episode.releaseDate.year}'),
                          Text(
                            ' - ',
                          ),
                          Text(
                            '${getHours(episode.duration)} hr, ${getMinutes(episode.duration)} min',
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                Icon(Icons.more_vert),
              ],
            ),
          ),
        ),
        SizedBox(height: 5),
      ],
    );
  }
}

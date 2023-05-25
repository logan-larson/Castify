import 'package:flutter/material.dart';
import 'package:mobileapp/widgets/queue_episode_card.dart';
import 'package:mobileapp/models/episode_model.dart';

class QueueScreen extends StatefulWidget {
  const QueueScreen({
    super.key,
  });

  @override
  State<QueueScreen> createState() => _QueueScreenState();
}

class _QueueScreenState extends State<QueueScreen> {
  List<QueueEpisodeCard> queue = <QueueEpisodeCard>[];

  void findMore() {
    print('Find more');
  }

  @override
  Widget build(BuildContext context) {
    // Dummy data for now eventually pull from database
    queue = [
      QueueEpisodeCard(
        EpisodeModel(
          'Lex Fridman',
          Duration(hours: 2, minutes: 37),
          DateTime(2023, 3, 24),
        ),
      ),
      QueueEpisodeCard(
        EpisodeModel(
          'Joe Rogan',
          Duration(hours: 2, minutes: 37),
          DateTime(2023, 3, 24),
        ),
      ),
      QueueEpisodeCard(
        EpisodeModel(
          '2000s Kids',
          Duration(hours: 2, minutes: 37),
          DateTime(2023, 3, 24),
        ),
      ),
      QueueEpisodeCard(
        EpisodeModel(
          'How I Built This',
          Duration(hours: 2, minutes: 37),
          DateTime(2023, 3, 24),
        ),
      ),
    ];

    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: ListView(children: [
        Center(
          child: Text(
            'Queue',
            style: TextStyle(fontSize: 20),
          ),
        ),
        ...queue,
        Center(
          child: ElevatedButton(
              onPressed: findMore,
              style: ElevatedButton.styleFrom(
                elevation: 5,
                backgroundColor: Colors.amber,
              ),
              child: Text('Find more')),
        ),
      ]),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:mobileapp/widgets/episode_card_section.dart';
import 'package:mobileapp/models/episode_model.dart';

// TEMP
import 'package:mobileapp/widgets/queue_episode_card.dart';

class LibraryScreen extends StatefulWidget {
  const LibraryScreen({
    super.key,
  });

  @override
  State<LibraryScreen> createState() => _LibraryScreenState();
}

class _LibraryScreenState extends State<LibraryScreen> {
  List<Widget> inboxEpisodes = [
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
  ];

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: ListView(
        children: [
          Center(
            child: Text(
              'Library',
              style: TextStyle(fontSize: 20),
            ),
          ),
          EpisodeCardSection(
            'Inbox',
            Text('Screen?'),
            inboxEpisodes,
          ),
        ],
      ),
    );
  }
}

import 'package:flutter/material.dart';

class EpisodeCardSection extends StatelessWidget {
  final String title;
  final Widget screen;
  final List<Widget> episodeCards;

  EpisodeCardSection(
    this.title,
    this.screen,
    this.episodeCards,
  );

  gotoScreen() {
    print(title);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        GestureDetector(
          onTap: gotoScreen,
          child: Row(
            children: [
              SizedBox(width: 10),
              Text(title, style: TextStyle(fontSize: 18)),
              Icon(Icons.chevron_right),
            ],
          ),
        ),
        ...episodeCards,
        Column(
          children: [
            Text('See more'),
            Icon(Icons.keyboard_arrow_down),
          ],
        ),
      ],
    );
  }
}

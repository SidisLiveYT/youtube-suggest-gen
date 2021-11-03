<div align="center">
  <br />
  <br />
  <p>
<h1>Youtube Suggest Gen</h1>
  </p>
</div>

## About

Youtube Suggest Generator helps to fetch Youtube Video Suggestions with the help of Query or URLs.

- Object-oriented , means Value returned in a structure format
- Customisable Validator
- Performant

## Installation

**Node.js 16 or newer is required.**

```
npm install youtube-suggest-gen
```

## Example usage

Fetch proxy :-

```
import { suggestions } from 'youtube-suggest-gen'
                OR
const { suggestions } = require('youtube-suggest-gen')

const Suggestions = suggestions('Despacito') // Returns Related Videos with the help of Despacito

```

## Strucutre of Suggestion

```
Suggestion = {
      id?: string;
      title?: string;
      published?: string;
      author: Author | 'string';
      ucid?: string; 
      author_thumbnail?: string; 
      short_view_count_text?: string;
      view_count?: string;
      length_seconds?: number;
      video_thumbnail?: string;
      thumbnails: thumbnail[];
      richThumbnails: thumbnail[];
      isLive: boolean;
}
```

## Links

- [Source Code](https://github.com/SidisLiveYT/youtube-suggest-gen.git)
- [GitHub Repo Link](https://github.com/SidisLiveYT/youtube-suggest-gen)
- [NPM Package](https://www.npmjs.com/package/youtube-suggest-gen)
- [Yarn Package](https://yarn.pm/youtube-suggest-gen)

## Contributing

Before creating an issue, please ensure that it hasn't already been reported/suggested, and double-check the ReadMe.md

## Help

If you don't understand something in the ReadMe.md , you are experiencing problems, or you just need a gentle
nudge in the right direction, please don't hesitate to join our official [Support Server](https://discord.gg/MfME24sJ2a).

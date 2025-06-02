import { Track } from 'src/tracks/entities/track.entity';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';

export class Favorite {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export type repoType = 'track' | 'album' | 'artist';

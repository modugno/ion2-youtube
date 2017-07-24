import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Youtube {

  // API KEY
  private _key = 'AIzaSyA1f3uekfC6KTz4ACCpeG5wsNl9J_UKhmU';
  // ID do Canal
  private _channel = 'UC9U4nIDyIzzelXrjNQXNvxA';
  // Endpoint da API do Channel
  private _endpointChannel = 'https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=';
  // Endpoint da API da Playlist
  private _endpointList = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
  // Endpoint da API do Video
  private _endpointVideo = 'https://www.googleapis.com/youtube/v3/videos?';
  // Embed do Video
  private _youtubeEmbed = 'https://www.youtube.com/embed/';

  constructor(public http: Http) { }

  // retorna todas as playlists do canal
  playlist(channel) {
      return this.http.get(this._endpointChannel + channel + `&key=${this._key}`);
  }

  // playlist paginação
  playlist_page(channel, pageToken) {
    return this.http.get(this._endpointChannel + channel + `&pageToken=${pageToken}&key=${this._key}`);
  }

  // retorna a playlist selecionada
  playlist_single(playlistId) {
    return this.http.get(this._endpointList + `&playlistId=${playlistId}&key=${this._key}`);
  }

  // paginação da playlist selecionada
  playlist_single_page(playlistId, pageToken) {
    return this.http.get(this._endpointList + `&pageToken=${pageToken}&playlistId=${playlistId}&key=${this._key}`);
  }

  // retorna informacões basicas do vídeo
  getVideoBasic(videoId) {
    console.log(this._endpointVideo + `part=snippet&key=${this._key}&id=${videoId}`);
    return this.http.get(this._endpointVideo + `part=snippet&key=${this._key}&id=${videoId}`);
  }

  // retorna estatisticas do vídeo
  getVideoStatistics(videoId) {
    console.log(this._endpointVideo + `part=statistics&key=${this._key}&id=${videoId}`);
    return this.http.get(this._endpointVideo + `&part=statistics&key=${this._key}&id=${videoId}`);
  }

  // retorna o caminho embed do vídeo
  getEmbed() {
    return this._youtubeEmbed;
  }

  // retorna o id do canal
  getChannel() {
    return this._channel;
  }
}

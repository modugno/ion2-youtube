import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, LoadingController } from 'ionic-angular';
import { Youtube } from '../../providers/youtube';
import { PlaylistPage } from '../playlist/playlist';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  public datas;
  public nextPageToken;

  constructor(
    public navCtrl: NavController, 
    private _youtube: Youtube, 
    private _loading: LoadingController) { }

  ngOnInit() {

    let loader = this._loading.create({
      content: 'Carregando Playlists'
    });

    // exibe loading
    loader.present();
    this._youtube.playlist(this._youtube.getChannel()).subscribe(data => {
      this.datas = data.json().items;
      this.nextPageToken = data.json().nextPageToken ? data.json().nextPageToken : null;
      // esconde loading
      loader.dismiss();
    });
  }

  // retorna o conteudo da playlist selecionada
  openPlaylist(playlistId, playlistTitle) {
    this.navCtrl.push(PlaylistPage, {
      playlistId: playlistId,
      playlistTitle: playlistTitle
    });
  }

  // carrega as playlists sobre demanda no scroll
  infiniteScroll(event) {

    if (!this.nextPageToken) {
      event.complete();
      return;
    }

    this._youtube.playlist_page(this._youtube.getChannel(), this.nextPageToken).subscribe(data => {
      for (let i of data.json().items) {
        this.datas.push(i);
      }

      event.complete();
      this.nextPageToken = data.json().nextPageToken ? data.json().nextPageToken : null;
      
    });

  }

}

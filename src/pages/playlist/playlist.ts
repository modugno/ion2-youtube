import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Youtube } from '../../providers/youtube';
import { VideoPage }  from '../video/video';

@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html',
})
export class PlaylistPage implements OnInit {
  
  public datas;
  public playlistTitle;
  public nextPageToken;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _loading: LoadingController,
    private _youtube: Youtube) { }

  ngOnInit() {

    // set loading
    let loader = this._loading.create({
      content: 'Carregando Vídeos'
    });

    // exibe loading
    loader.present();

    this._youtube.playlist_single( this.navParams.get('playlistId') ).subscribe(data => {
        
        this.playlistTitle = this.navParams.get('playlistTitle');
        this.datas = data.json().items;
        this.nextPageToken = data.json().nextPageToken ? data.json().nextPageToken : null;
        // esconde loading
        loader.dismiss();
      });
    
  }

  // vai para a tela de detalhes do vídeo
  openVideoPage(videoId) {
    return this.navCtrl.push(VideoPage, {videoId: videoId});
  }

  // carrega os videos da playlist sobre demanda no scroll
  infiniteScroll(event) {

    if (!this.nextPageToken) {
      event.complete();
      return;
    }

    this._youtube.playlist_single_page(this.navParams.get('playlistId'), this.nextPageToken).subscribe(data => {
      for (let i of data.json().items) {
        this.datas.push(i);
      }

      event.complete();
      this.nextPageToken = data.json().nextPageToken ? data.json().nextPageToken : null;
      
    });

  }
}
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Youtube } from '../../providers/youtube';

@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage implements OnInit {

  public data;
  public videoTitle: string;
  public videoId: string;
  public viewCount: number;
  public likeCount: number;
  public dislikeCount: number;
  public favoriteCount: number;
  public commentCount: number;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _loading: LoadingController,
    private _youtube: Youtube,
    private _dom: DomSanitizer
    ) {
      this.videoId = this.navParams.get('videoId');
    }

  ngOnInit() {

    let loader = this._loading.create({
      content: 'Carregando Vídeo'
    });

    // exibe loading
    loader.present();

    // informações básicas do vídeo
    this._youtube.getVideoBasic(this.videoId).subscribe(data => {
      this.data = data.json().items;
      this.videoTitle = this.data[0].snippet.title;
    });

    // Estatisticas do Vídeo
    this._youtube.getVideoStatistics(this.videoId).subscribe(data => {
      let statistics = data.json().items[0];
      
      this.viewCount     = statistics.statistics.viewCount;
      this.likeCount     = statistics.statistics.likeCount;
      this.dislikeCount  = statistics.statistics.dislikeCount;
      this.favoriteCount = statistics.statistics.favoriteCount;
      this.commentCount  = statistics.statistics.commentCount;
    });

    // esconde loading
    loader.dismiss();
  }

  // executa o vídeo
  playVideo(videoId) {
    console.log(videoId);
    return this._dom.bypassSecurityTrustResourceUrl(this._youtube.getEmbed() + videoId);
  }
}

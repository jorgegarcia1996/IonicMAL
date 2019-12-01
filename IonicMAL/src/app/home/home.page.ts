import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimeService } from '../service/anime/anime.service';
import { Anime } from '../model/anime';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  animes: Anime[];
  generos: string[];
  searchGenre: string;
  clicked: boolean;
  index: number;

  constructor(private router: Router,
    private service: AnimeService,
    private alert: AlertController) {
      this.generos = this.service.getGenres();
      this.getData();
      this.searchGenre = "todos";
      this.clicked = false;
      this.index = 0;
  }

  getData() {
    this.service.getAnimes().subscribe(
      data => {
        this.animes = data;
      }
    );
  }

  showDetails(id: number) {
    let aux = this.animes.findIndex(a => a.id == id);
    this.clicked = !this.clicked;
    if (aux != this.index) {
      this.index = this.animes.findIndex(a => a.id == id);
      this.clicked = !this.clicked;
    }
  }

  addToFavorites(anime: Anime) {
    this.service.addToFavorites(anime);
  }

  deleteFromFavorites(anime: Anime) {
    this.service.deleteFromFavorites(anime);
  }

  async alertDeleteFavorite(anime: Anime) {
    const alert = await this.alert.create({
      header: `¿Eliminar ${anime.title} de los favoritos?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Quitar',
          cssClass: 'danger',
          handler: () => {
            this.deleteFromFavorites(anime);
          }
        }
      ]
    });
    await alert.present();
  }
}

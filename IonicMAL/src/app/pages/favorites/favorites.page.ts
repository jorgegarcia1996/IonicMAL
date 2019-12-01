import { Component, OnInit } from '@angular/core';
import { AnimeService } from 'src/app/service/anime/anime.service';
import { Anime } from 'src/app/model/anime';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  favorites: Anime[] = [];
  clicked: boolean;
  index: number;

  constructor(private service: AnimeService, 
    private router: Router,
    private alert: AlertController) { }

   ngOnInit() {
    this.service.getFavorites().then(
      data => this.favorites = data == null ? [] : data
    );
   }

   showDetails(id: number) {
    this.clicked = !this.clicked;
    this.index = this.favorites.findIndex(a => a.id == id);
  }

  deleteFromFavorites(anime: Anime) {
    this.service.deleteFromFavorites(anime).then(
      () => this.service.getFavorites().then(
        data => this.favorites = data == null ? [] : data
      )
    );
    this.clicked = !this.clicked;
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

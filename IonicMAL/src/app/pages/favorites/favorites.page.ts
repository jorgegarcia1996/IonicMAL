import { Component, OnInit } from '@angular/core';
import { AnimeService } from 'src/app/service/anime/anime.service';
import { Anime } from 'src/app/model/anime';
import { Router } from '@angular/router';

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
    private router: Router) { }

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
}

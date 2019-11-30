import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimeService } from '../service/anime/anime.service';
import { Anime } from '../model/anime';

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
    private service: AnimeService) {
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
}

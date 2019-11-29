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

  constructor(private router: Router,
    private service: AnimeService) {
      this.generos = this.service.getGeneres();
      this.getData();
      this.searchGenre = "todos";
  }

  getData() {
    this.service.getAnimes().subscribe(
      data => {
        this.animes = data;
      }
    );
  }
}

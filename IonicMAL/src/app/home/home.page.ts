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
  genero: string;
  generos: string[];

  constructor( private router: Router,
               private service: AnimeService) {
    this.getData();
    this.genero = "todos";
  }

  genreFilter() {
    this.getData();
    if (this.genero != "todos") {
      this.service.getAnimes().subscribe(
        data => {
          data = data.filter(f => {
            f.genres.includes(this.genero);
            console.log(this.genero);
          });
          this.animes = data;
        }
      );
    }
  }

  getData() {
    this.service.getAnimes().subscribe(
      data => {
        this.animes = data;
      }
    );
    this.generos = this.service.getGeneres();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Anime } from 'src/app/model/anime';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  generos: string[] = [];
  generosAux: string[] = [];
  favorites: Anime[] = [];

  constructor(private httpClient: HttpClient,
    private storage: Storage) {
    this.getAnimes().subscribe(
      data => {
        data.forEach(f => {
          f.genres.forEach(e => {
            this.generosAux.push(e);
          });
        });
        this.generosAux.forEach(g => {
          if (!this.generos.includes(g)) {
            this.generos.push(g);
          }
        });
      }
    );
    this.getFavorites().then(
      data => this.favorites = data == null ? [] : data
    );
  }

  getGenres(): string[] {
    return this.generos;
  }

  getAnimes(): Observable<any> {
    return this.httpClient.get('assets/data.json');
  }

  getFavorites(): Promise<Anime[]> {
    return this.storage.get('favorites');
  }

  addToFavorites(anime: Anime): Promise<boolean> {
    this.favorites.push(anime);
    return this.storage.set('favorites', this.favorites);
  }

  deleteFromFavorites(anime: Anime): Promise<boolean> {
    this.favorites = this.favorites.filter(f => f.id != anime.id);
    return this.storage.set('favorites', this.favorites);
  }
}

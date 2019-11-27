import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  generos: string[] = [];
  generosAux: string[] = [];

  constructor(private httpClient: HttpClient) { 
    this.getAnimes().subscribe(
      data => {
        data.forEach(f => {
          f.genres.forEach(e => {
            this.generosAux.push(e);
          });
        });
        this.generosAux.forEach(g => {
          if(!this.generos.includes(g)) {
            this.generos.push(g);
          }
        });
      }
    );
   }

   getGeneres(): string[] {
    return this.generos;
   }

  getAnimes(): Observable<any> {
    return this.httpClient.get('assets/data.json');

  }
}

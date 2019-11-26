import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  apiUrl: string = "https://api.jikan.moe/v3";

  maxAnimeId: number = 14648;

  //Numero de mangas: 32719

  constructor(private httpClient: HttpClient) {  }

  getAnimes(): Observable<any> {
    let randomId = Math.floor(Math.random() * this.maxAnimeId + 1);
    
    return this.httpClient.get(`${this.apiUrl}/anime/${randomId}`);

  }
}

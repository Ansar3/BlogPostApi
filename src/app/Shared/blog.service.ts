import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { BlogPost } from '../models/blogpost';
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  myAppUrl: string;
  myApiUrl: string;
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
    this.myAppUrl="https://localhost:5001/"
      this.myApiUrl = 'api/blog/';
  }

  getBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(this.myAppUrl + this.myApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getBlogPost(postId: number): Observable<BlogPost> {
      return this.http.get<BlogPost>(this.myAppUrl + this.myApiUrl + postId,this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveBlogPost(blogPost:BlogPost): Observable<BlogPost> {
    console.log(JSON.stringify(blogPost))
      return this.http.post<BlogPost>(this.myAppUrl + this.myApiUrl, JSON.stringify(blogPost), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateBlogPost(postId: number, blogPost): Observable<BlogPost> {
      return this.http.put<BlogPost>(this.myAppUrl + this.myApiUrl + postId, JSON.stringify(blogPost), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteBlogPost(postId: number): Observable<BlogPost> {
      return this.http.delete<BlogPost>(this.myAppUrl + this.myApiUrl + postId,this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
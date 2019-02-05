import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Todo} from '../models/Todo';

const httpOptions={
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  
  todosUrl:string = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit = '?_limit=9';

  constructor(private http:HttpClient) { }

  //get todos
  getTodos():Observable<Todo[]>{
    return this.http.get<Todo[]>(this.todosUrl + this.todosLimit);  
  }

  //delete todo
  deleteTodo(todo:Todo):Observable<Todo>{
    const url = `${this.todosUrl}/${todo.id}`;    
    return this.http.delete<Todo>(url, httpOptions);
  }

  //add todo
  addTodo(todo: Todo):Observable<Todo>{
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

  //toggle completed
  toggleCompleted(todoI: Todo): Observable<any> { //returns observable any because server todo has userId
    const url = `${this.todosUrl}/${todoI.id}`;
    return this.http.put(url, todoI, httpOptions);
  }

}

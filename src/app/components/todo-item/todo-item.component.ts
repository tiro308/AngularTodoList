import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {TodoService} from '../../services/todo.service';

import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todoI: Todo; //from parent component
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter(); //to parent component

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  //set dynamic classes
  setClasses(){
    let classes = {
      todo: true,
      'is-complete': this.todoI.completed //wegen - in '' setzen
    }
    return classes;
  }

  onToggle(todoI){
    //toggle in UI
    todoI.completed= !todoI.completed;
    //toggle on Server
    this.todoService.toggleCompleted(todoI).subscribe(todo =>
      console.log(todo));

  }

  onDelete(todoI){
    console.log('delete ' + todoI.title);
    this.deleteTodo.emit(todoI);
  }

}

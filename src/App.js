import React from 'react';
import { KanbanBoard } from './KanbanBoard';

let cardsList = [
  {
    id: 1,
    title: 'Read the book',
    description: 'I should read the **whole** book',
    color: '#BD8D31',
    status: 'in-progress',
    tasks: []
  },
  {
    id: 2,
    title: 'Write some code',
    description: 'Code along with the samples in the book. Example at [github](https://github.com/natalie0826/angularBlog/blob/sequelize/src/styles.css)',
    color: '#3A7E28',
    status: 'todo',
    tasks: [
      {
        id: 1,
        name: 'ContactList Example',
        done: true
      },
      {
        id: 2,
        name: 'Kanban Example',
        done: false
      },
      {
        id: 3,
        name: 'My own experiments',
        done: true
      }
    ]
  },
];

export const App = () => {
  return (
    <KanbanBoard cards={cardsList} />
  );
}

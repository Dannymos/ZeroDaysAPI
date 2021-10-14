export default class TaskDTO {
  constructor(
    id?: string,
    title?: string,
    completed?: boolean,
    description?: string,
    duedate?: Date,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.duedate = duedate;
  }

  id?: string;

  title?: string;

  description?: string;

  completed?: boolean;

  duedate?: Date;
}

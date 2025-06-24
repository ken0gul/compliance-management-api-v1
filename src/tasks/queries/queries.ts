export class GetAllTasksQuery {
  constructor(
    public readonly framework?: string,
    public readonly category?: string,
  ) {}
}

export class GetTaskByIdQuery {
  constructor(public readonly id: string) {}
}
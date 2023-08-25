from flask import Flask, request
import strawberry
from strawberry.flask.views import GraphQLView

app = Flask(__name__)
tasks = []

@strawberry.type
class Task:
    description: str
    done: bool


@strawberry.type
class Query:
    @strawberry.field
    def list_tasks(self) -> list[Task]:
        return tasks


@strawberry.type
class Mutation:

    @strawberry.mutation
    def new_task(self, description: str) -> Task:
        task = Task(description=description, done=False)
        tasks.append(task)
        return task

    @strawberry.mutation
    def mark_done(self, task_id: int) -> Task:
        task = tasks[task_id]
        task.done = True
        return task


def schema():
    return strawberry.Schema(query=Query, mutation=Mutation)


app.add_url_rule(
    "/graphql",
    view_func=GraphQLView.as_view("graphql_view", schema=schema()),
)


if __name__ == '__main__':
    app.run(port=8080, debug=True)



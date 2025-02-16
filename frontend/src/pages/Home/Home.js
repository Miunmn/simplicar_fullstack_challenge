import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Home = ({ tasks, fetchTasks }) => {
  const handleDragEnd = async ({ destination, source }) => {
    if (!destination) return;
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return;
    const taskGroup = tasks[source.droppableId].items;
    const task = taskGroup[source.index];
    const id = task.id;

    try {
      await axios.put(`/update-task?id=${id}`, {
        status: destination.droppableId,
      });
      await fetchTasks();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="container">
      <DragDropContext onDragEnd={handleDragEnd}>
        {Object.entries(tasks).map((task) => (
          <div
            className={`${task[1].title.toLowerCase()}__wrapper`}
            key={task[1].title}
          >
            <h3>{task[1].title}</h3>
            <div className={`${task[1].title.toLowerCase()}__container`}>
              <Droppable droppableId={task[1].title}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {task[1].items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`${task[1].title.toLowerCase()}__items`}
                          >
                            <strong>{item.title}</strong>
                            <p>{item.description}</p>
                            {/* <p className="comment">
                              <Link
                                to={`/comments/${task[1].title}/${item.id}`}
                              >
                                {item.comments.length > 0
                                  ? `View Comments`
                                  : "Add Comment"}
                              </Link>
                            </p> */}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

export default Home;

import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import type { ColumnItem } from "./Dashboard";
//import type { DroppableProvided } from "@types/react-beautiful-dnd";

interface Props {
  columns: ColumnItem[];
}

const Column = (props: { columns: ColumnItem[]; columnId: string }) => {
  return (
    <div className="no-wrap mx-2 flex gap-2">
      <Droppable droppableId={props.columnId} type="group">
        {(droppableProvided, draggableSnapshot) => {
          return (
            <div
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
            >
              {props.columns.map((column, idx) => {
                return (
                  <Draggable
                    draggableId={column.id}
                    key={column.id}
                    index={idx}
                  >
                    {(draggableProvided) => {
                      return (
                        <div
                          key={column.id}
                          className=" my-2 rounded-md bg-purple-300 px-36 py-4 hover:translate-y-1"
                          {...draggableProvided.dragHandleProps}
                          {...draggableProvided.draggableProps}
                          ref={draggableProvided.innerRef}
                        >
                          <ColumnList {...column} />
                        </div>
                      );
                    }}
                  </Draggable>
                );
              })}
              {droppableProvided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};

function ColumnList(props: { colName: string; id: string; items: string[] }) {
  return (
    <Droppable droppableId={props.id}>
      {(provided) => {
        return (
          <div>
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <h3>{props.colName}</h3>
            </div>
            <div className="items-container">
              {props.items.map((item, idx) => {
                return (
                  <Draggable draggableId={item} index={idx} key={item}>
                    {(provided) => {
                      return (
                        <div
                          className="bg-slate-300"
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <p>{item}</p>
                        </div>
                      );
                    }}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          </div>
        );
      }}
    </Droppable>
  );
}

export default Column;

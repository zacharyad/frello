import React, { useState } from "react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";

export interface ColumnItem {
  colName: string;
  id: string;
  desc: string;
  items: string[];
  isActive: boolean;
}

const Dashboard = () => {
  const [columns, setItems] = useState([
    {
      colName: "1",
      id: "one",
      desc: "1st",
      items: ["une", "du", "trois"],
      isActive: true,
    },
    {
      colName: "2",
      id: "two",
      desc: "second Column",
      items: ["start", "stop", "go"],
      isActive: true,
    },
    {
      colName: "3",
      id: "three",
      desc: "third",
      items: ["1", "2", "3"],
      isActive: true,
    },
    {
      colName: "4",
      id: "four",
      desc: "last Column",
      items: ["one", "two", "three"],
      isActive: true,
    },
  ]);

  const handleDragDrop = (results: any) => {
    const { source, destination, type } = results;
    if (destination === null) return;
    if (
      destination.droppableId === source.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderredColumns = [...columns];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;
      const [removedColumns] = reorderredColumns.splice(sourceIndex, 1);

      if (removedColumns === undefined) return;
      reorderredColumns.splice(destinationIndex, 0, removedColumns);
      setItems(reorderredColumns);
    }

    console.log("destination: ", destination, "source: ", source);

    const storeSourceIndex = columns.findIndex((column) => column.id=== source.drappableId)
    const storeDestinationIndex = columns.findIndex((column) => column.id === destination.droppableId)
    const newSourceItems = source[...columns[storeSourceIndex].items]
    const newDestinationItems = source.droppableId !== destination.droppableId
? [...columns[storeDestinationIndex].items] : newSourceItems  };

  return (
    <div className="bg-slate-400 p-16">
      <h1 className="my-2 flex justify-center rounded-lg bg-slate-100 p-4 text-slate-700">
        Dashboard
      </h1>
      <DragDropContext onDragEnd={(results) => handleDragDrop(results)}>
        <Column columns={columns} columnId={"One"} />
      </DragDropContext>
    </div>
  );
};

export default Dashboard;

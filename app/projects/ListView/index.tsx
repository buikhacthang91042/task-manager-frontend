import { useGetTasksQuery, User } from "@/state/api";
import React from "react";
import { format } from "date-fns";
type ListProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

type TaskProps = {
  id: number;
  title: string;
  assignee?: User;
  author?: User;
  priority: string;
  status: string;
  startDate: string;
  dueDate: string;
};

function ListView({ id, setIsModalNewTaskOpen }: ListProps) {
  const { data: taskList } = useGetTasksQuery({ projectId: Number(id) });
  console.log("data task", taskList);
  const formatDate = (date: string) => {
    return format(new Date(date), "dd-MM-yyyy");
  };

  const renderBodyList = (tasks: TaskProps[]) => {
    return tasks.map((task: TaskProps) => (
      <tr
        key={task.id}
        className="border border-solid transition hover:bg-gray-50"
      >
        <td className="border-r px-4 py-3">{task.title}</td>
        <td className="border-r px-4 py-3">{task.assignee?.username}</td>
        <td className="border-r px-4 py-3">{task.author?.username}</td>
        <td className="border-r px-4 py-3">{task.priority}</td>
        <td className="border-r px-4 py-3">{task.status}</td>
        <td className="border-r px-4 py-3">{formatDate(task.startDate)}</td>
        <td className="px-4 py-3">{formatDate(task.dueDate)}</td>
      </tr>
    ));
  };

  return (
    <div className="p-4">
      <table className="min-w-full border-collapse border bg-white text-sm">
        <thead className="sticky top-0 z-10 bg-gray-100 text-left">
          <tr className="border">
            <th className="border-r px-4 py-3 font-semibold text-gray-700">
              Work
            </th>
            <th className="border-r px-4 py-3 font-semibold text-gray-700">
              Assignee
            </th>
            <th className="border-r px-4 py-3 font-semibold text-gray-700">
              Reporter
            </th>
            <th className="border-r px-4 py-3 font-semibold text-gray-700">
              Priority
            </th>
            <th className="border-r px-4 py-3 font-semibold text-gray-700">
              Status
            </th>
            <th className="border-r px-4 py-3 font-semibold text-gray-700">
              Created
            </th>
            <th className="px-4 py-3 font-semibold text-gray-700">Due date</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {taskList && renderBodyList(taskList)}
        </tbody>
      </table>
    </div>
  );
}

export default ListView;

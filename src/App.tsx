import {useState} from 'react';

import style from './App.module.css';

import { Button } from './components/button/Button'
import { TaskCategory } from './components/taskCategory/TaskCategory'
import { Tasks } from './components/tasks/Tasks';
import { CardType, CategoryType, FilterValuesType, TaskType, allTasks, taskCategory, taskType } from './state/state';
import { AddCard } from './components/addCard/AddCard';

export const App = () =>{

let tasks: CardType[] = [];
  
const [filter, setFilter] = useState<FilterValuesType>("All")

function filterTasks(value: FilterValuesType){
  setFilter(value);
}

switch(filter){
  case "To Do":
    tasks = allTasks.filter(t => t.status === "To Do");
    break;
  case "Ongoing":
    tasks = allTasks.filter(t => t.status === "Ongoing");
    break;
  case "Done":
    tasks = allTasks.filter(t => t.status === "Done");
    break;
  default:
    tasks = allTasks;
}

 const [isModalVisible, setModalVisiblity] = useState(false)

  function changeModalState(){
    setModalVisiblity(!isModalVisible)
  }

  return (
    <div className={style.app}>
      <AddCard isModalVisible={isModalVisible} onClose={changeModalState}/>
      <div className={style.header}>
        <Button onOpen={changeModalState}/>
        <div className={style.taskCategory}>
        {
          taskCategory.map((category: CategoryType, index) => 
          <TaskCategory key={index}
            filter={category.filter} 
            filterTasks={filterTasks}
            checked={filter === category.filter}
          />)
        }
        </div>
      </div>
      <div className={style.tasks}>
        {
          taskType.map((tt: TaskType, index) => 
          <Tasks key={index}
            type={tt.type}
            checked={tt.checked}
            tasks={tasks.filter(t => t.type === tt.filterParameter)}
          />)
        }
      </div>
    </div>
  );
}



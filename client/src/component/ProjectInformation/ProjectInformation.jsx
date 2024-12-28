import "./ProjectInformation.css";

import CustomerSelect from "../../component/CustomerSelect/CustomerSelect";
import ShowPathInUSM from "../../component/ShowPathInUSM/ShowPathInUSM";

export default function ProjectInformation({
    informationInPath,
    dataToSelect,
}) {
  return (
    <>
      <h1>{project.name}</h1>
      <CustomerSelect
        options={customers}
        filterKey="name"
        maxItems={5}
        placeholderValue="Choose User"
        onSelect={(customer) => {
          setSelectedCustomer(customer);
          setSelectedEpic(null);
          setSelectedStory(null);
          setSelectedTask(null);
        }}
        defaultValue={selectedCustomer} // Передаем значение по умолчанию
      />
      {selectedCustomer && (
        <CustomerSelect
          options={epics}
          filterKey="name"
          maxItems={5}
          placeholderValue="Choose Epic"
          onSelect={(epic) => {
            setSelectedEpic(epic);
            setSelectedStory(null);
            setSelectedTask(null);
          }}
          defaultValue={selectedEpic} // Передаем значение по умолчанию
        />
      )}
      {selectedEpic && (
        <CustomerSelect
          options={stories}
          filterKey="name"
          maxItems={5}
          placeholderValue="Choose Story"
          onSelect={(story) => {
            setSelectedStory(story);
            setSelectedTask(null);
          }}
          defaultValue={selectedStory} // Передаем значение по умолчанию
        />
      )}
      {selectedStory && (
        <CustomerSelect
          options={tasks}
          filterKey="name"
          maxItems={5}
          placeholderValue="Choose Task"
          onSelect={setSelectedTask}
          defaultValue={selectedTask} // Передаем значение по умолчанию
        />
      )}
      {selectedCustomer && selectedEpic && selectedStory && selectedTask && (
        <ShowPathInUSM
          customerData={selectedCustomer}
          epicData={selectedEpic}
          storyData={selectedStory}
          taskData={selectedTask}
        />
      )}
    </>
  );
}

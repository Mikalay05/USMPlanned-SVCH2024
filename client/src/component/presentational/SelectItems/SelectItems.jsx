// SelectItems.js
import React from "react";
import CustomerSelect from "../../CustomerSelect/CustomerSelect";

const SelectItems = ({
  defaultValueOfCustomer,
  defaultValueOfEpic,
  defaultValueOfStory,
  customersArray = [],
  epicsArray = [],
  storiesArray = [],
  tasksArray = [],
  filterKeyForCustomers = 'name',
  filterKeyForEpics = 'name',
  filterKeyForStories = 'name',
  filterKeyForTasks = 'name',
  handleSelectCustomer = () => {},
  handleSelectEpic = () => {},
  handleSelectStory = () => {},
  handleSelectTask = () => {},
}) => {
  return (
    <div className="selected-in-InformationForStory">
      <CustomerSelect
        defaultValue={defaultValueOfCustomer}
        options={customersArray}
        filterKey={filterKeyForCustomers}
        onSelectItem={handleSelectCustomer}
      />

      <CustomerSelect
        defaultValue={defaultValueOfEpic}
        options={epicsArray}
        filterKey={filterKeyForEpics}
        onSelectItem={handleSelectEpic}
      />
      
      <CustomerSelect
        defaultValue={defaultValueOfStory}
        options={storiesArray}
        filterKey={filterKeyForStories}
        onSelectItem={handleSelectStory}
      />
      
      <CustomerSelect
        options={tasksArray}
        filterKey={filterKeyForTasks}
        onSelectItem={handleSelectTask}
      />
    </div>
  );
};

export default SelectItems;

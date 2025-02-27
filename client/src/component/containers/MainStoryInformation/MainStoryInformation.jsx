import InformationForStory from "../InformationForStory/InformationForStory";
import SliderMapOfTaskForTheStory from "../SliderMapOfTaskForTheStory/SliderMapOfTaskForTheStory";
import StoryActionsData from "../StoryActionsData/StoryActionsData";
import "./MainStoryInformation.css";
export default function MainStoryInformation() {
  return (
    <main>
      <InformationForStory />
      <SliderMapOfTaskForTheStory/>
      <StoryActionsData />
    </main>
  );
}
 
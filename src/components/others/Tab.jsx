import { Tabs } from "react-simple-tabs-component";
// (Optional) if you don't want to include bootstrap css stylesheet
import "react-simple-tabs-component/dist/index.css";

// Tabs structure Array

export default function App({ Users, Friends, user, friend }) {
  const TabOne = () => Users;

  const TabTwo = () => Friends;

  const tabs = [
    {
      label: user, // Tab Title - String
      Component: TabOne, // Tab Body - JSX.Element
    },
    {
      label: friend,
      Component: TabTwo,
    },
  ];

  return (
    <div className="App">
      <Tabs tabs={tabs} /* Props */ />
    </div>
  );
}

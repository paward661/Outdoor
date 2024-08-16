import Header from "./Header";
import Feed from "./Feed";
import Stats from "./Stats";
import DropdownMenu from "./DropdownMenu";
import ProfilePic from "./ProfilePic.js";

function Home() {
  return (
    <div>
      <Header pageTitle={"OUTDOOR"} />
      <ProfilePic editOn={false} />
      <DropdownMenu />
      <Feed />
      <Stats />
    </div>
  );
}

export default Home;

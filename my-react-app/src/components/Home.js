import Header from "./Header";
import Feed from "./Feed";
import Stats from "./Stats";
import DropdownMenu from "./DropdownMenu";

function Home() {
  return (
    <div>
      <Header editOn={false} pageTitle={"OUTDOOR"} />
      <DropdownMenu />
      <Feed />
      <Stats />
    </div>
  );
}

export default Home;

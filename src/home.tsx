import Botao from "./components/Botao/Botao";
import PopularList from "./pages/PopularList";
import UpComingList from "./pages/UpComingList";

function Home() {
  return (
    <>
      <h1>MovieDB EDIT</h1>

      <PopularList />
      <UpComingList />
    </>
  );
}

export default Home;

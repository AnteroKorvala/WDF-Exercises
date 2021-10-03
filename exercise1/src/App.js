
import './App.css'
import TopBar from './components/topBar'
import Popup from './components/popup'
import MainContent from './components/mainContent'
import MostRead from './components/mostRead'

function App() {
  return (
    <div className="App">
      <TopBar/>
      <Popup/>
      <div className="mainWrapper">
        <MainContent/>
        <MostRead/>
      </div>
    </div>
  );
}

export default App;

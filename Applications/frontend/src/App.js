import './App.css';
import Authen from './components/Authen';
import PatientSide from './components/PatirntSide';
import PrivacyGroup from './components/PrivacyGroup';
import SmartContract from './components/SmartContract';
import History from './components/History';
import Record from './components/Record';

function App() {
  return (
    <div className='App'>
      <Authen />
      <PrivacyGroup />
      <SmartContract />
      <Record/>
      {/* <History/> */}
    </div>
  );
}

export default App;

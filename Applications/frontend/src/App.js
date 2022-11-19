import './App.css';
import Authen from './components/Authen';
import PatientSide from './components/PatirntSide';
import PrivacyGroup from './components/PrivacyGroup';
import SmartContract from './components/SmartContract';

function App() {
  return (
    <div className='App'>
      <Authen />
      <PrivacyGroup />
      <SmartContract />
    </div>
  );
}

export default App;

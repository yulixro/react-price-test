import './App.css';
import { AgeGroupPriceList } from './components/ageGroupPriceList';

function App() {
  return (
    <div className="home">
      <div className='home__form'>
        <AgeGroupPriceList onChange={(result) => console.log(result)} />
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
// import sampleLocations from './sampleData/myArray.json';
import FilterAside from './components/FilterAside';
import Card from './components/Card';
import { monthList, prettyMonth } from './utils';

const { collection, getDocs } = require('@firebase/firestore');
const { db } = require('./firebaseConfig/firebaseConfig');

function App() {
  const [locations, setLocations] = useState([]);
  const [checkedAnimals, setCheckedAnimals] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const dbLocs = collection(db, 'locations');

    // // // for local dev
    // setLocations(sampleLocations.slice(0, 3));
    // setIsLoading(false);
    // setIsError(false);

    // for production
    getDocs(dbLocs)
      .then((res) => {
        setLocations(res.docs.map((doc) => doc.data()));
        setIsLoading(false);
        setIsError(false);
        // console.log('data fetched');
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        console.error(`Error getting documents: ${error}`);
      });
  }, []);

  const handleCheckboxChange = (event) => {
    const { name } = event.target;
    setCheckedAnimals((prevCheckedAnimals) => (prevCheckedAnimals.includes(name)
      ? prevCheckedAnimals.filter((checkedAnimal) => checkedAnimal !== name)
      : [...prevCheckedAnimals, name]));
  };

  const handleMonthChange = (event) => {
    const month = event.target.value;
    setSelectedMonth((prevState) => (month === prevState ? '' : month));
  };

  const handleResetMonthFilter = () => {
    setSelectedMonth('');
  };
  const handleResetAnimalFilter = () => {
    setCheckedAnimals([]);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const filteredLocations = locations.filter((location) => {
    let animals = [];
    let sightings = [];
    if (checkedAnimals.length === 0 && !selectedMonth) {
      return (
        location.name.toLowerCase().includes(searchQuery.toLowerCase())
        || location.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedMonth !== '') {
      const animalListFilteredByMonth = location.animal_list.filter(
        (animal) => animal.monthly_sighting[selectedMonth] > 10,
      );
      animals = animalListFilteredByMonth.map((animal) => animal.name);
      sightings = animalListFilteredByMonth.flatMap((animal) => Object.keys(animal.monthly_sighting));
    } else {
      animals = location.animal_list.map((animal) => animal.name);
      sightings = location.animal_list.flatMap((animal) => Object.keys(animal.monthly_sighting));
    }
    return (
      checkedAnimals.every((checkedAnimal) => animals.includes(checkedAnimal))
      && (!selectedMonth || sightings.includes(selectedMonth))
      && (location.name.toLowerCase().includes(searchQuery.toLowerCase())
        || location.country.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const allAnimals = [
    ...new Set(
      locations.flatMap((location) => location.animal_list.map((animal) => animal.name)),
    ),
  ];
  const animalFilterDisabledList = allAnimals.map((animal) => filteredLocations.every(
    (location) => !location.animal_list.some((animalObj) => animalObj.name === animal),
  ));

  if (isLoading) {
    <p>Loading...</p>;
  }

  if (isError) {
    <p>Error has occured while loading data. Please contact admin.</p>;
  }

  return (
    <section className="pt-0">
      <div className="container-sm">
        <div className="row">
          <aside className="col-xl-4 col-xxl-3">
            <FilterAside
              allAnimals={allAnimals}
              animalFilterDisabledList={animalFilterDisabledList}
              checkedAnimals={checkedAnimals}
              handleCheckboxChange={handleCheckboxChange}
              handleResetAnimalFilter={handleResetAnimalFilter}
              searchQuery={searchQuery}
              handleSearch={handleSearch}
              selectedMonth={selectedMonth}
              prettyMonth={prettyMonth}
              monthList={monthList}
              handleMonthChange={handleMonthChange}
              handleResetMonthFilter={handleResetMonthFilter}
            />
          </aside>
          <div className="col-xl-8 col-xxl-9">
            <div className="vstack gap-4">
              {filteredLocations.map((location) => (
                <Card
                  location={location}
                  selectedMonth={selectedMonth}
                  monthList={monthList}
                  prettyMonth={prettyMonth}
                  checkedAnimals={checkedAnimals}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;

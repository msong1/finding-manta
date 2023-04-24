import React, { useState } from 'react';
import { locations } from './sampleData/data.js';

const monthList =
  ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]

const App = () => {
  const [checkedAnimals, setCheckedAnimals] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  const handleCheckboxChange = (event) => {
    const name = event.target.name;
    if (checkedAnimals.includes(name)) {
      setCheckedAnimals(checkedAnimals.filter((checkedAnimal) => checkedAnimal !== name));
    } else {
      setCheckedAnimals([...checkedAnimals, name]);
    }
  };

  const handleMonthChange = (event) => {
    console.log(event);
    const month = event.target.value;
    setSelectedMonth(month === selectedMonth ? '' : month);
  };

  const handleResetMonthFilter = () => {
    setSelectedMonth('');
  };
  const handleResetAnimalFilter = () => {
    setCheckedAnimals([]);
  };

  const filteredLocations = locations.filter((location) => {
    let animals = [];
    let sightings = [];
    // no filter is selected
    if (checkedAnimals.length === 0 && !selectedMonth) {
      return true;
    } else {
      if (selectedMonth !== '') {
        const animalListFilteredByMonth = location.animal_list.filter((animal) => animal.monthly_sighting[selectedMonth] > 10)
        animals = animalListFilteredByMonth.map((animal) => animal.name);
        sightings = animalListFilteredByMonth.flatMap((animal) => Object.keys(animal.monthly_sighting));
      } else {
        animals = location.animal_list.map((animal) => animal.name);
        sightings = location.animal_list.flatMap((animal) => Object.keys(animal.monthly_sighting));
      }
      return (checkedAnimals.every((checkedAnimal) => animals.includes(checkedAnimal))
        && (!selectedMonth || sightings.includes(selectedMonth)));
    }
  }
  );
  console.log(filteredLocations);

  const filteredAnimals = new Set();
  filteredLocations.forEach((({ animal_list }) => {
    animal_list.forEach((animal) => {
      (selectedMonth ? animal.monthly_sighting[selectedMonth] > 10 && filteredAnimals.add(animal.name)
      : filteredAnimals.add(animal.name));
    });
  }))


  const allAnimals = [...new Set(locations.flatMap((location) => location.animal_list.map((animal) => animal.name)))];
  const animalFilterDisabledList = Array(allAnimals.length).fill(false);
  allAnimals.forEach((animal, index) => {
    animalFilterDisabledList[index] =
    filteredAnimals.has(animal) ? false : true
  })

  // if (selectedMonth === '') {
  //   const monthFilterDisabledList = Array(monthList.length).fill(false);
  //   filteredLocations

  // } else {
  //   const monthFilterDisabledList = Array(monthList.length).fill(false);
  // }

  return (
    <div>
      <div>
        {monthList.map((month, index) => (
          <label key={month}>
            <input
              type="radio"
              name="month"
              value={month}
              checked={selectedMonth === month}
              onChange={handleMonthChange}
              // disabled={monthFilterDisabledList[index]}
            />
            {month}
          </label>
        ))}
        <button onClick={handleResetMonthFilter}>Reset Month Filter</button>
      </div>
      <div>
        {allAnimals.map((animal, index) => (
          <label key={animal}>
            <input
              type="checkbox"
              name={animal}
              disabled={animalFilterDisabledList[index]}
              checked={checkedAnimals.includes(animal)}
              onChange={handleCheckboxChange}
            />
            {animal}
          </label>
        ))}
        <button onClick={handleResetAnimalFilter}>Reset Animal Filter</button>
      </div>
      <div>
        {filteredLocations.map((location) => (
          <div key={location.location_id}>
            <h2>{location.name}</h2>
            {location.animal_list
              .filter((animal) => {
                if (!selectedMonth) {
                  return true;
                } else {
                  return animal.monthly_sighting[selectedMonth] > 10;
                }
              })
              .filter((animal) => checkedAnimals.length === 0 || checkedAnimals.includes(animal.name))
              .map((animal) => (
                <div key={animal.name}>
                  <h3>{animal.name}</h3>
                  <ul>
                    {selectedMonth === '' ?
                      monthList.map(month =>
                        <li>{`${month}: ${animal.monthly_sighting[month]}`}</li>
                      )
                      : <li>{`${selectedMonth}: ${animal.monthly_sighting[selectedMonth]}`}</li>
                    }
                  </ul>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

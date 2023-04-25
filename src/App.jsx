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

  function Circle({ value }) {
    const circleStyle = {
      10: {backgroundColor: 'white',
      border: '1px solid white'},
      20: {backgroundColor: 'white',
      border: '1px solid #038cfc'},
      30: {backgroundColor: '#038cfc',
        border: '1px solid #038cfc'}
    }

    return<div style={{
      height: '8px',
      width: '8px',
      borderRadius: '50%',
      ...circleStyle[value]
    }}></div>
  }

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
          <div className="form-check form-check-inline">
              <input
              className="form-check-input"
                type="radio"
                name="month"
                value={month}
                checked={selectedMonth === month}
                onChange={handleMonthChange}
              // disabled={monthFilterDisabledList[index]}
              />
            <label key={month}>
              {month}
            </label>
            </div>
        ))}
        <button type="button" className="btn btn-secondary" onClick={handleResetMonthFilter}>Reset Month Filter</button>
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

            <div className="table-responsive">
              <thead>
                <tr>
                  <th scope='col'>Name</th>
                  {selectedMonth === '' ?
                    monthList.map(month =>
                      <th scope='col'>{`${month.slice(0, 3)}`}</th>
                    )
                    : <th scope='col'>{`${selectedMonth.slice(0, 3)}`}</th>
                  }
                </tr>
              </thead>
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
                  <tbody>
                    <th scope="row">{animal.name}</th>
                    {selectedMonth === '' ?
                      monthList.map(month =>
                        <td><Circle value={animal.monthly_sighting[month]} /></td>
                      )
                      : <td><Circle value={animal.monthly_sighting[selectedMonth]} /></td>
                    }
                  </tbody>
                ))
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import sampleLocations from './sampleData/myArray.json';

const monthList = [
  'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december',
];

function Circle({ value }) {
  const circleStyle = {
    10: { backgroundColor: 'white', border: '1px solid white' },
    20: { backgroundColor: 'white', border: '1px solid #038cfc' },
    30: { backgroundColor: '#038cfc', border: '1px solid #038cfc' },
  };

  return (
    <div
      className="position-absolute top-50 start-50 translate-middle"
      style={{
        height: '8px',
        width: '8px',
        borderRadius: '50%',
        ...circleStyle[value],
      }}
    />
  );
}

const prettyMonth = (month) => `${month[0].toUpperCase() + month.slice(1, 3)}`;

function App() {
  const [locations, setLocations] = useState(sampleLocations);
  const [checkedAnimals, setCheckedAnimals] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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
    setLocations(
      sampleLocations.filter(
        (location) => location.name.toLowerCase().includes(query.toLowerCase())
          || location.country.toLowerCase().includes(query.toLowerCase()),
      ),
    );
    setSearchQuery(query);
  };

  const filteredLocations = locations.filter((location) => {
    let animals = [];
    let sightings = [];
    if (checkedAnimals.length === 0 && !selectedMonth) {
      return true;
    }
    if (selectedMonth !== '') {
      const animalListFilteredByMonth = location.animal_list.filter(
        (animal) => animal.monthly_sighting[selectedMonth] > 10,
      );
      animals = animalListFilteredByMonth.map((animal) => animal.name);
      sightings = animalListFilteredByMonth
        .flatMap((animal) => Object.keys(animal.monthly_sighting));
    } else {
      animals = location.animal_list.map((animal) => animal.name);
      sightings = location.animal_list.flatMap((animal) => Object.keys(animal.monthly_sighting));
    }
    return (
      checkedAnimals.every((checkedAnimal) => animals.includes(checkedAnimal))
        && (!selectedMonth || sightings.includes(selectedMonth))
    );
  });

  const allAnimals = [
    ...new Set(locations.flatMap((location) => location.animal_list.map((animal) => animal.name))),
  ];
  const animalFilterDisabledList = allAnimals
    .map((animal) => filteredLocations
      .every((location) => !location.animal_list
        .some((animalObj) => animalObj.name === animal)));

  return (
    <div className="row p-2">
      <aside className="col-sm-12 col-md-3 col-l-4 col-xl-2 col-xxl-2" style={{ minWidth: '210px', maxWidth: '230px' }}>
        <div className="sticky-top" style={{ maxHeight: '1200px', overflowY: 'scroll', display: 'block' }}>
          <div>
            <div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search..."
              />
            </div>
            {monthList.map((month) => (
              <div className="form-check form-check-inline">
                <label htmlFor={month}>
                  {prettyMonth(month)}
                  <input
                    id={month}
                    className="form-check-input"
                    type="radio"
                    name="month"
                    value={month}
                    checked={selectedMonth === month}
                    onChange={handleMonthChange}
                  />
                </label>
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={handleResetMonthFilter}>
              Reset
            </button>
          </div>
          <div className="form-check">
            {allAnimals.map((animal, index) => (
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={animal}
                  disabled={animalFilterDisabledList[index]}
                  checked={checkedAnimals.includes(animal)}
                  onChange={handleCheckboxChange}
                  id={animal}
                />
                <label className="form-check-label" htmlFor={animal}>
                  {animal}
                </label>
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={handleResetAnimalFilter}>
              Reset
            </button>
          </div>
        </div>
      </aside>
      <div className="col-md-9 col-lg-8 col-xl-8 col-xxl-9">
        <div className="vstack gap-4">
          {filteredLocations.map((location) => (
            <div className="card shadow p-2">
              <div className="row g-0" style={{ height: '240px' }}>
                <div className="col-md-3 position-relative">
                  <img
                    alt="destination-thumbnail"
                    className="img-fluid"
                    src={location.thumbnail}
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      padding: '10px',
                      borderRadius: '23px',
                    }}
                  />
                </div>
                <div className="col-md-9 col-lg-9" key={location.location_id}>
                  <h2>{`${location.name}, ${location.country}`}</h2>
                  <div className="table-responsive" style={{ maxHeight: '200px', overflowY: 'scroll', display: 'block' }}>
                    <table className="table">
                      <thead className="sticky-top" style={{ backgroundColor: 'white' }}>
                        <tr>
                          <th scope="col">Name</th>
                          {selectedMonth === ''
                            ? monthList.map((month) => (
                              <th scope="col" key={month}>
                                {prettyMonth(month)}
                              </th>
                            ))
                            : (
                              <th scope="col">
                                {prettyMonth(selectedMonth)}
                              </th>
                            )}
                        </tr>
                      </thead>
                      {location.animal_list
                        .filter((animal) => {
                          if (!selectedMonth) {
                            return true;
                          }
                          return animal.monthly_sighting[selectedMonth] > 10;
                        }).filter((animal) => checkedAnimals.length === 0
                            || checkedAnimals.includes(animal.name))
                        .map((animal) => (
                          <tbody key={animal.name}>
                            <tr>
                              <th scope="row">{animal.name}</th>
                              {selectedMonth === ''
                                ? monthList.map((month) => (
                                  <td key={month} className="position-relative">
                                    <Circle value={animal.monthly_sighting[month]} />
                                  </td>
                                ))
                                : (
                                  <td className="position-relative">
                                    <Circle value={animal.monthly_sighting[selectedMonth]} />
                                  </td>
                                )}
                            </tr>
                          </tbody>
                        ))}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

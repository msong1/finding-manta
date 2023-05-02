import React, { useState, useEffect } from 'react';
import sampleLocations from './sampleData/myArray.json';
import FilterAside from './components/FilterAside';
import Circle from './components/Circle';
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

    // // for local dev
    setLocations(sampleLocations);
    setIsLoading(false);
    setIsError(false);

    // // for production
    // getDocs(dbLocs)
    //   .then((res) => {
    //     setLocations(res.docs.map((doc) => doc.data()));
    //     setIsLoading(false);
    //     setIsError(false);
    //     // console.log('data fetched');
    //   })
    //   .catch((error) => {
    //     setIsLoading(false);
    //     setIsError(true);
    //     console.error(`Error getting documents: ${error}`);
    //   });
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
      return location.name.toLowerCase().includes(searchQuery.toLowerCase())
        || location.country.toLowerCase().includes(searchQuery.toLowerCase());
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
      && (location.name.toLowerCase().includes(searchQuery.toLowerCase())
        || location.country.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const allAnimals = [
    ...new Set(locations.flatMap((location) => location.animal_list.map((animal) => animal.name))),
  ];
  const animalFilterDisabledList = allAnimals
    .map((animal) => filteredLocations
      .every((location) => !location.animal_list
        .some((animalObj) => animalObj.name === animal)));

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
                <div className="card shadow p-2" key={location.id}>
                  <div className="row g-0">
                    <div className="col-md-3 position-relative">
                      <img
                        alt="destination-thumbnail"
                        className="img-fluid"
                        src={location.thumbnail}
                        style={{
                          // position: 'absolute',
                          // top: '0',
                          // left: '0',
                          width: '100%',
                          height: '100%',
                          maxHeight: '300px',
                          objectFit: 'cover',
                          padding: '10px',
                          borderRadius: '23px',
                        }}
                      />
                    </div>
                    <div className="col-md-7" key={location.location_id}>
                      <div className="d-flex justify-content-between align-items-center">
                        <h2>
                          {`${location.name}, ${location.country}`}
                        </h2>
                        <button
                          type="button"
                          className="btn btn-sm btn-light btn-round d-flex align-items-center justify-content-center"
                          onClick={console.log}
                          style={{
                            width: '21px',
                            height: '21px',
                            borderRadius: '50%',
                            textAlign: 'center',
                          }}
                        >
                          <i className="bi bi-suit-heart" style={{ lineHeight: '16px', marginTop: '1px' }} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-light btn-round d-flex align-items-center justify-content-center"
                          onClick={console.log}
                          style={{
                            width: '21px',
                            height: '21px',
                            borderRadius: '50%',
                            textAlign: 'center',
                          }}
                        >
                          <i className="bi bi-share-fill" style={{ lineHeight: '16px', marginTop: '1px' }} />
                        </button>

                        {/* <i className="bi bi-share" onClick={console.log} /> */}
                      </div>
                      <small>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                          <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                          <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                        COUNTRY, CONTINENT
                      </small>
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
      </div>
    </section>
  );
}

export default App;

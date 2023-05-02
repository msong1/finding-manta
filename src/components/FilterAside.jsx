import React, { useState } from 'react';

function FilterAside({
  allAnimals, animalFilterDisabledList,
  checkedAnimals, handleCheckboxChange, handleResetAnimalFilter,
  handleSearch, searchQuery,
  selectedMonth, prettyMonth, monthList, handleMonthChange, handleResetMonthFilter,
}) {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  return (
    <div>
      <button
        className="btn btn-secondary mb-2 d-xl-none"
        type="button"
        onClick={handleOffcanvas}
        aria-controls="offcanvasSidebar"
        aria-expanded={showOffcanvas}
      >
        Show Filters
      </button>
      <div
        className={`offcanvas-xl offcanvas-end data-bs-scroll="true"
        ${showOffcanvas ? 'show' : ''
        }`}
        tabIndex="-1"
        id="offcanvasSidebar"
        aria-labelledby="offcanvasSidebarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasSidebarLabel">
            Advance Filters
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={handleOffcanvas}
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body flex-column p-3 p-xl-0">
          <form className="rounded-3 shadow">
            <div
              className="card card-body rounded-0 rounded-top p-4"
              style={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'scroll' }}
            >
              <div className=" mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by location name"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <div className="mb-2">
                <div className="dropdown">
                  <button
                    className="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    id="monthDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {selectedMonth ? prettyMonth(selectedMonth) : 'Select Month'}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="monthDropdown">
                    {monthList.map((month) => (
                      <li key={month}>
                        <button
                          className="dropdown-item"
                          type="button"
                          value={month}
                          onClick={handleMonthChange}
                        >
                          {prettyMonth(month)}
                        </button>
                      </li>
                    ))}
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={handleResetMonthFilter}
                      >
                        Reset Filter
                      </button>
                    </li>
                  </ul>
                </div>

              </div>
              <div className=" mb-2">
                <span className="fw-bold m-2">Animals</span>
                <button type="button" className="btn btn-outline-secondary" onClick={handleResetAnimalFilter}>
                  Reset
                </button>
              </div>
              <div className="col-12">
                {allAnimals.map((animal, index) => (
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name={animal}
                      disabled={animalFilterDisabledList[index]}
                      checked={checkedAnimals.includes(animal)}
                      onChange={(e) => handleCheckboxChange(e)}
                      id={animal}
                    />
                    <label className="form-check-label" htmlFor={animal}>
                      {animal}
                    </label>
                  </div>
                ))}

              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FilterAside;

import React from 'react';
import Circle from './Circle';

export default function Card({
  location,
  selectedMonth,
  monthList,
  prettyMonth,
  checkedAnimals,
}) {
  return (
    <div className="card shadow p-2" key={location.id}>
      <div className="row g-0">
        <div className="col-md-3 position-relative">
          <img
            alt="destination-thumbnail"
            className="img-fluid"
            src={location.thumbnail}
            style={{
              width: '100%',
              height: '100%',
              maxHeight: '300px',
              objectFit: 'cover',
              padding: '10px',
              borderRadius: '23px',
            }}
          />
        </div>
        <div className="col-md-9" key={location.location_id}>
          <div className="d-flex justify-content-between align-items-center">
            <h2>{`${location.name}`}</h2>
            <div className="hstack gap-1">
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
                <i className="fa-regular fa-fw fa-heart" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  style={{ lineHeight: '16px', marginTop: '1px' }}
                >
                  <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8
                  119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2
                  7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4
                  81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1
                  145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6
                  101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7
                  32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3
                  .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"
                  />
                </svg>
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
                <i
                  className="fa-solid fa-share"
                  style={{ lineHeight: '16px', marginTop: '1px' }}
                />
              </button>
            </div>
          </div>
          <div>
            <small>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-geo-alt"
                viewBox="0 0 16 16"
              >
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481
                31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1
                10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"
                />
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
              {location.country}
            </small>
          </div>
          <ul className="nav nav-divider my-1">
            <li className="nav-item h6 fw-normal mb-0">
              <svg
                className="me-1"
                width="18px"
                height="18px"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h48v48H0z" fill="none" />
                <g id="material_x5F_system_x5F_icon_x5F_border" />
                <path
                  d="M19.827,21.692h0.346C21.654,24.316,24.459,26,27.538,26C32.204,26,36,22.204,36,17.538c0-4.665-3.796-8.461-8.462-8.461
H12.462C7.796,9.077,4,12.873,4,17.538C4,22.204,7.796,26,12.462,26C15.541,26,18.346,24.316,19.827,21.692z"
                />
                <path
                  d="M38,32c0,4.411-3.589,8-8,8h-2c-3.38,0-4.878-2.18-5.526-4.403C23.38,35.08,24,34.116,24,33c0-1.654-1.346-3-3-3h-2
c-1.654,0-3,1.346-3,3c0,1.461,1.051,2.678,2.437,2.943C19.613,40.941,23.107,44,28,44h2c6.448,0,11.71-5.116,11.975-11.5H42V4h-4
V32z"
                />
              </svg>
              200 people logged in this site
            </li>
            <li className="nav-item h6 fw-normal mb-0">
              <svg
                className="me-1"
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.3 5.71002C18.841 5.24601 18.2943 4.87797 17.6917 4.62731C17.0891 4.37666 16.4426 4.2484
                  15.79 4.25002C15.1373 4.2484 14.4909 4.37666 13.8883 4.62731C13.2857 4.87797 12.739 5.24601
                  12.28 5.71002L12 6.00002L11.72 5.72001C10.7917 4.79182 9.53273 4.27037 8.22 4.27037C6.90726
                  4.27037 5.64829 4.79182 4.72 5.72001C3.80386 6.65466 3.29071 7.91125 3.29071 9.22002C3.29071
                  10.5288 3.80386 11.7854 4.72 12.72L11.49 19.51C11.6306 19.6505 11.8212 19.7294 12.02 19.7294C12.2187
                  19.7294 12.4094 19.6505 12.55 19.51L19.32 12.72C20.2365 11.7823 20.7479 10.5221 20.7442
                  9.21092C20.7405 7.89973 20.2218 6.64248 19.3 5.71002Z"
                  fill="#000000"
                />
              </svg>
              400 people want to go
            </li>
          </ul>

          <div className="d-grid gap-3 d-sm-block">
            <a
              className="btn btn-outline-primary me-2"
              href="asdvasd.com"
              role="button"
            >
              Learn more
            </a>
            <a
              className="btn btn-outline-primary me-2"
              href="asdvasd.com"
              role="button"
            >
              Book your stay
            </a>
            <a
              className="btn btn-outline-primary me-2"
              href="asdvasd.com"
              role="button"
            >
              Book your dives
            </a>
          </div>
          <div
            className="table-responsive"
            style={{
              maxHeight: '200px',
              overflowY: 'scroll',
              display: 'block',
            }}
          >
            <table className="table" style={{ justifyContent: 'flex-start' }}>
              <thead
                className="sticky-top"
                style={{ backgroundColor: 'white', zIndex: 1 }}
              >
                <tr style={{ justifyContent: 'flex-start' }}>
                  <th scope="col">Name</th>
                  {selectedMonth === '' ? (
                    monthList.map((month) => (
                      <th scope="col" key={month} className="px-0">
                        {prettyMonth(month)}
                      </th>
                    ))
                  ) : (
                    <th scope="col">{prettyMonth(selectedMonth)}</th>
                  )}
                </tr>
              </thead>
              {location.animal_list
                .filter((animal) => {
                  if (!selectedMonth) {
                    return true;
                  }
                  return animal.monthly_sighting[selectedMonth] > 10;
                })
                .filter(
                  (animal) => checkedAnimals.length === 0
                    || checkedAnimals.includes(animal.name),
                )
                .map((animal) => (
                  <tbody key={animal.name}>
                    <tr>
                      <th scope="row">{animal.name}</th>
                      {selectedMonth === '' ? (
                        monthList.map((month) => (
                          <td key={month} className="position-relative">
                            <Circle value={animal.monthly_sighting[month]} />
                          </td>
                        ))
                      ) : (
                        <td className="position-relative">
                          <Circle
                            value={animal.monthly_sighting[selectedMonth]}
                          />
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
  );
}

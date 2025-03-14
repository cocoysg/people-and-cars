import { useQuery } from '@apollo/client';
import { GET_PEOPLE, GET_CARS } from '../../graphql/queries';
import { List } from 'antd';
import PersonCard from '../listItems/PersonCard';

// People component
const People = () => {
  const styles = getStyles();
  const { loading: loadingPeople, error: errorPeople, data: peopleData } = useQuery(GET_PEOPLE);
  const { loading: loadingCars, error: errorCars, data: carsData } = useQuery(GET_CARS);

  if (loadingPeople || loadingCars) return 'Loading...';
  if (errorPeople) return `Error! ${errorPeople.message}`;
  if (errorCars) return `Error! ${errorCars.message}`;

  // Merge person and their cars
  const peopleWithCars = peopleData.people.map(person => {
    const personCars = carsData.cars.filter(car => car.personId === person.id);
    return { ...person, cars: personCars };  // Return merged data for each person with their cars
  });

  // Render the list of people and their cars
  return (
    <div style={styles.list}>
      <h2 style={styles.header}>Records</h2>
      <List>
        {peopleWithCars.map(person => (
          <List.Item key={person.id}>
            <PersonCard {...person} />
          </List.Item>
        ))}
      </List>
    </div>
  );
};

// People styles
const getStyles = () => ({
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    textAlign: 'center',
  },
});

export default People;

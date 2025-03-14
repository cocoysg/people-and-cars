import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { PERSON_WITH_CARS } from '../graphql/queries';
import PersonCard from '../components/listItems/PersonCard';
import { Button } from 'antd';

// ShowPerson component
const ShowPerson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(PERSON_WITH_CARS, { variables: { id } });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const { personWithCars } = data;

  // Render PersonCard
  // Add flag disableEditRemove so all editing and deleting are disabled on this page
  return (
    <div style={getStyles().container}>
      <PersonCard {...personWithCars} disableEditRemove={true} />
      <Button type='primary' onClick={() => navigate('/')} style={getStyles().button}>
        GO BACK HOME
      </Button>
    </div>
  );
};

// Show Person styles
const getStyles = () => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '50px',
  },
  button: {
    marginTop: '20px',
  },
});

export default ShowPerson;

import Card from 'antd/es/card/Card';
import UpdatePerson from '../forms/UpdatePerson';
import RemovePerson from '../buttons/RemovePerson';
import { EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import CarCard from './CarCard';

// PersonCard component
const PersonCard = (props) => {
  const [editMode, setEditMode] = useState(false);
  const styles = getStyles();
  const { id, firstName, lastName, cars } = props;

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  // Render the card
  return (
    <div style={styles.personCard}>
      {editMode && !props.disableEditRemove ? (
        <UpdatePerson
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          title={`${firstName} ${lastName}`}
          style={styles.card}
          actions={
            props.disableEditRemove
              ? [] // Hide edit/delete/learn more when in Show Person page
              : [
                  <EditOutlined onClick={handleButtonClick} />,
                  <RemovePerson id={id} />,
                  <a href={`/people/${id}`} style={styles.learnMore}>LEARN MORE</a>
                ]
          }
        >
          {cars && cars.length > 0 ? (
            cars.map(car => (
              <CarCard key={car.id} {...car} disableEditRemove={props.disableEditRemove} />
            ))
          ) : (
            <p>No cars to show.</p>
          )}
        </Card>
      )}
    </div>
  );
};

// PersonCard styles
const getStyles = () => ({
  card: {
    width: '70vw',
    marginBottom: '20px',
    border: '1px solid #999',
    borderRadius: '8px',
  },
  personCard: {
    width: '70vw',
  },
  learnMore: {
    float: 'left',
    color: '#1677ff',
  },
});

export default PersonCard;

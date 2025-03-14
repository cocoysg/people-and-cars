import Card from 'antd/es/card/Card';
import UpdateCar from '../forms/UpdateCar';
import RemoveCar from '../buttons/RemoveCar';
import { EditOutlined } from '@ant-design/icons';
import { useState } from 'react';

// CarCard component
const CarCard = (props) => {
  const { id, year, make, model, price, personId } = props;
  const [editMode, setEditMode] = useState(false);
  const styles = getStyles();

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  // Render the card
  return (
    <div style={styles.carCard}>
      {editMode && !props.disableEditRemove ? (
        <UpdateCar
          id={id}
          year={year}
          make={make}
          model={model}
          price={price}
          personId={personId}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          size='small'
          style={styles.card}
          actions={
            props.disableEditRemove
              ? [] // Hide edit/delete/learn more when in Show Person page
              : [
                  <EditOutlined onClick={handleButtonClick} />,
                  <RemoveCar id={id} />
                ]
          }
        >
          <p>
            {year} {make} {model} → ${formatPrice(price)}
          </p>
        </Card>
      )}
    </div>
  );
};

// Function to format price with commas
const formatPrice = (price) => {
  const numericPrice = Number(price);
  if (!isNaN(numericPrice)) {
    return numericPrice.toLocaleString('en-US');
  }
  return price;
};

// CarCard styles
const getStyles = () => ({
  carCard: {
    marginBottom: '20px',
  },
  card: {
    width: '100%',
  },
});

export default CarCard;

import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { GET_CARS, REMOVE_CAR } from '../../graphql/queries';
import filter from 'lodash.filter';

// Remove a car from the list
const RemoveCar = ({ id }) => {
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      const { cars } = cache.readQuery({ query: GET_CARS });

      // Update the cache
      cache.writeQuery({
        query: GET_CARS,
        data: {
          cars: filter(cars, c => {
            return c.id !== removeCar.id;
          }),
        },
      });
    },
  });

  // Handle button click
  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this car?');
    if (result) {
      removeCar({
        variables: { id },
      });
    }
  };

  // Delete icon
  return <DeleteOutlined onClick={handleButtonClick} key="delete" style={getStyles().deleteIcon} />;
};

export default RemoveCar;

// RemoveCar styles
const getStyles = () => ({
  deleteIcon: {
    color: 'red',
  },
});

import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { GET_PEOPLE, REMOVE_PERSON } from '../../graphql/queries';
import filter from 'lodash.filter';

// Remove a person from the list
const RemovePerson = ({ id }) => {
  const [removePerson] = useMutation(REMOVE_PERSON, {
    update(cache, { data: { removePerson } }) {
      const { people } = cache.readQuery({ query: GET_PEOPLE });

      // Update the cache
      cache.writeQuery({
        query: GET_PEOPLE,
        data: {
          people: filter(people, p => {
            return p.id !== removePerson.id
          }),
        },
      });
    },
  });

  // Handle button click
  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this person?');

    if (result) {
      removePerson({
        variables: { id }
      });
    }
  };

  // Delete icon
  return <DeleteOutlined onClick={handleButtonClick} key='delete' style={getStyles().deleteIcon} />;
};

export default RemovePerson;

// RemovePerson styles
const getStyles = () => ({
  deleteIcon: {
    color: 'red',
  },
});

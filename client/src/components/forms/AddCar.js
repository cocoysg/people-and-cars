import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ADD_CAR, GET_CARS, GET_PEOPLE } from '../../graphql/queries';

// Add a car to the list
const AddCar = () => {
  // Remove the id from state; we'll generate a new id on each submission
  // const [id] = useState(uuidv4());
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const [addCar] = useMutation(ADD_CAR);
  const [peopleOptions, setPeopleOptions] = useState([]);

  const { data } = useQuery(GET_PEOPLE);

  useEffect(() => {
    forceUpdate({});
    if (data && data.people) {
      setPeopleOptions(data.people);
    }
  }, [data]);

  // Handle form submission
  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;

    // Generate a new unique id on each submission
    const newId = uuidv4();
    addCar({
      variables: {
        id: newId,
        year: parseInt(year, 10), // convert year to Int
        make,
        model,
        price: parseFloat(price), // convert price to Float
        personId
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_CARS });
        cache.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, addCar],
          },
        });
      },
    });
    // Clear form after submit
    form.resetFields();
  };

  // If no people exist, hide the Add Car form
  if (peopleOptions.length === 0) return null;

  // Render the form with heading and aligned button
  return (
    <>
      <h2 style={getStyles().heading}>Add Car</h2>
      <Form
        name='add-car-form'
        layout='inline'
        size='large'
        style={getStyles().form}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label={<span><span style={{ color: 'red' }}></span>Year</span>}
          name='year'
          rules={[{ required: true, message: 'Please enter the year' }]}
          style={getStyles().formItem}
        >
          <Input placeholder='Year' style={getStyles().inputYear} />
        </Form.Item>
        <Form.Item
          label={<span><span style={{ color: 'red' }}></span>Make</span>}
          name='make'
          rules={[{ required: true, message: 'Please enter the make' }]}
          style={getStyles().formItem}
        >
          <Input placeholder='Make' style={getStyles().inputMake} />
        </Form.Item>
        <Form.Item
          label={<span><span style={{ color: 'red' }}></span>Model</span>}
          name='model'
          rules={[{ required: true, message: 'Please enter the model' }]}
          style={getStyles().formItem}
        >
          <Input placeholder='Model' style={getStyles().inputModel} />
        </Form.Item>
        <Form.Item
          label={<span><span style={{ color: 'red' }}></span>Price</span>}
          name='price'
          rules={[{ required: true, message: 'Please enter the price' }]}
          style={getStyles().formItem}
        >
          <Input addonBefore='$' placeholder='Price' style={getStyles().inputPrice} />
        </Form.Item>
        <Form.Item
          label={<span><span style={{ color: 'red' }}></span>Person</span>}
          name='personId'
          rules={[{ required: true, message: 'Please select a person' }]}
          style={getStyles().formItem}
        >
          <Select placeholder='Select a person' style={getStyles().selectPerson}>
            {peopleOptions.map(person => (
              <Select.Option key={person.id} value={person.id}>
                {person.firstName} {person.lastName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          shouldUpdate={true}
          style={getStyles().submitButton}
        >
          {() => (
            <Button
              type='primary'
              htmlType='submit'
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              Add Car
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default AddCar;

// AddCar styles
const getStyles = () => ({
  heading: {
    textAlign: 'center',
    width: '100%',
    marginBottom: '20px',
  },
  form: {
    marginBottom: '40px',
    justifyContent: 'center',
  },
  formItem: {
    margin: '0 20px 10px 0',
  },
  inputYear: {
    width: 100,
  },
  inputMake: {
    width: 150,
  },
  inputModel: {
    width: 150,
  },
  inputPrice: {
    width: 150,
  },
  selectPerson: {
    width: 200,
  },
  submitButton: {
    margin: '0 20px 10px 0',
    alignSelf: 'center',
  },
});

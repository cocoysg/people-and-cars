import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import { UPDATE_CAR, GET_PEOPLE } from '../../graphql/queries';

// Update car information
const UpdateCar = (props) => {
  const { id, year, make, model, price, personId } = props;
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const [updateCar] = useMutation(UPDATE_CAR);
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
    updateCar({
      variables: {
        id,
        year: parseInt(year, 10),
        make,
        model,
        price: parseFloat(price),
        personId
      },
    });
    props.onButtonClick();
  };

  // Render the form
  return (
    <Form
      form={form}
      name='update-car-form'
      layout='inline'
      onFinish={onFinish}
      initialValues={{ year, make, model, price, personId }}
    >
      <Form.Item
        name='year'
        rules={[{ required: true, message: 'Please enter the year' }]}
      >
        <Input placeholder='Year' />
      </Form.Item>
      <Form.Item
        name='make'
        rules={[{ required: true, message: 'Please enter the make' }]}
      >
        <Input placeholder='Make' />
      </Form.Item>
      <Form.Item
        name='model'
        rules={[{ required: true, message: 'Please enter the model' }]}
      >
        <Input placeholder='Model' />
      </Form.Item>
      <Form.Item
        name='price'
        rules={[{ required: true, message: 'Please enter the price' }]}
      >
        <Input addonBefore='$' placeholder='Price' />
      </Form.Item>
      <Form.Item
        name='personId'
        rules={[{ required: true, message: 'Please select a person' }]}
      >
        <Select placeholder='Select a person'>
          {peopleOptions.map(person => (
            <Select.Option key={person.id} value={person.id}>
              {person.firstName} {person.lastName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              !form.isFieldsTouched(false) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default UpdateCar;

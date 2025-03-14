import { useMutation } from '@apollo/client';
import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { ADD_PERSON, GET_PEOPLE } from '../../graphql/queries';

// Add a person to the list
const AddPerson = () => {
  const [id] = useState(uuidv4());
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const [addPerson] = useMutation(ADD_PERSON);

  useEffect(() => {
    forceUpdate({});
  }, []);

  // Handle form submission
  const onFinish = (values) => {
    const { firstName, lastName } = values;

    addPerson({
      variables: {
        id,
        firstName,
        lastName
      },
      update: (cache, { data: { addPerson } }) => {
        const data = cache.readQuery({ query: GET_PEOPLE });
        cache.writeQuery({
          query: GET_PEOPLE,
          data: {
            ...data,
            people: [...data.people, addPerson],
          },
        });
      },
    });
    // Clear form after submit
    form.resetFields();
  };

  // Render the form
  return (
    <>
      <h2 style={getStyles().heading}>Add Person</h2>
      <Form
        name='add-person-form'
        layout='inline'
        size='large'
        style={getStyles().form}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label={<span><span style={{ color: 'red' }}></span>First Name</span>}
          name='firstName'
          rules={[{ required: true, message: 'Please enter a first name' }]}
          style={getStyles().formItem}
        >
          <Input placeholder='First Name' style={getStyles().input} />
        </Form.Item>
        <Form.Item
          label={<span><span style={{ color: 'red' }}></span>Last Name</span>}
          name='lastName'
          rules={[{ required: true, message: 'Please enter a last name' }]}
          style={getStyles().formItem}
        >
          <Input placeholder='Last Name' style={getStyles().input} />
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
              Add Person
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default AddPerson;

// AddPerson styles
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
  input: {
    width: 120,
  },
  submitButton: {
    margin: '0 20px 10px 0',
    alignSelf: 'center',
  },
});

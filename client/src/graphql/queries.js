import { gql } from '@apollo/client';

// Query to get all people
export const GET_PEOPLE = gql`
  {
    people {
      id
      firstName
      lastName
    }
  }
`;

// Query to get all cars
export const GET_CARS = gql`
  {
    cars {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

// Query to get a person and their cars
export const PERSON_WITH_CARS = gql`
  query PersonWithCars($id: String!) {
    personWithCars(id: $id) {
      id
      firstName
      lastName
      cars {
        id
        year
        make
        model
        price
        personId
      }
    }
  }
`;

// Mutation to add a new person
export const ADD_PERSON = gql`
  mutation AddPerson($id: String!, $firstName: String!, $lastName: String!) {
    addPerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

// Mutation to update a person's info
export const UPDATE_PERSON = gql`
  mutation UpdatePerson($id: String!, $firstName: String!, $lastName: String!) {
    updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

// Mutation to remove a person
export const REMOVE_PERSON = gql`
  mutation RemovePerson($id: String!) {
    removePerson(id: $id) {
      id
      firstName
      lastName
    }
  }
`;

// Mutation to add a new car
export const ADD_CAR = gql`
  mutation AddCar($id: String!, $year: Int!, $make: String!, $model: String!, $price: Float!, $personId: String!) {
    addCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

// Mutation to update a car's info
export const UPDATE_CAR = gql`
  mutation UpdateCar($id: String!, $year: Int!, $make: String!, $model: String!, $price: Float!, $personId: String!) {
    updateCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

/// Mutation to remove a car
export const REMOVE_CAR = gql`
  mutation RemoveCar($id: String!) {
    removeCar(id: $id) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

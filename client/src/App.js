import './App.css';
import AddPerson from './components/forms/AddPerson';
import AddCar from './components/forms/AddCar';
import Title from './components/layout/Title';
import People from './components/lists/People';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowPerson from './pages/ShowPerson';

// Set up Apollo Client to connect to GraphQL server
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

// App component
const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='App'>
          <Routes>
            <Route
              path='/'
              element={
                <>
                  <Title />
                  <AddPerson />
                  <AddCar />
                  <People />
                </>
              }
            />
            <Route path='/people/:id' element={<ShowPerson />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;


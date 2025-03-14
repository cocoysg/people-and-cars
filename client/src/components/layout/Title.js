const Title = () => {
  const styles = getStyles();

  // Display page title
  return <h1 style={styles.title}>PEOPLE AND THEIR CARS</h1>;
};

// Title styles
const getStyles = () => ({
  title: {
    fontSize: 30,
    padding: '15px',
    marginBottom: '50px',
    textAlign: 'center'
  },
});

export default Title;

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  // Test case: Check if the App component renders without errors
  test('renders the app without errors', () => {
    render(<App />);
    // Assert that the App component is rendered successfully
    // We can look for some specific content on the page as an indicator
    const headerElement = screen.getByText(/404 Not Found/i);
    expect(headerElement).toBeInTheDocument();
  });

  // You can add more test cases to check specific functionality or behavior of the component
  // For example, you can write tests to check if the data is fetched and displayed correctly,
  // if the state is updated as expected, etc.

  // Test case: Check if the loading state is displayed while fetching data
  test('displays a loading state while fetching data', () => {
    render(<App />);
    // Assert that a loading state message is displayed while the data is being fetched
    const loadingElement = screen.getByText(/Fetching data/i);
    expect(loadingElement).toBeInTheDocument();
  });

  // Test case: Check if the fetched data is displayed correctly
  test('displays the fetched Pokémon data correctly', async () => {
    // You may need to mock the fetch function to simulate the API response for testing
    // For simplicity, let's assume we have mocked the fetch function and its response.
    // You can use a library like "msw" to mock API calls in your tests.
    // In this test, we'll just use a mocked data for demonstration purposes.
    const mockedData = [
      { id: 1, name: 'Bulbasaur', type: ['Grass', 'Poison'], imageUrl: 'bulbasaur.png' },
      // Add more mocked data as needed for your test cases...
    ];

    // Mock the fetch function to return the desired data
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => mockedData,
    });

    render(<App />);

    // Assert that the fetched Pokémon data is displayed on the page
    const bulbasaurElement = await screen.findByText(/Bulbasaur/i);
    expect(bulbasaurElement).toBeInTheDocument();

    // Add more assertions as needed to check other parts of the component
  });
});

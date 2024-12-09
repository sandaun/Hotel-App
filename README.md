# HotelApp

**HotelApp** is a mobile application developed with **React Native** that allows users to view a list of hotels, apply filters (by stars, price, and rating), and explore detailed information about a specific hotel, including an image gallery and its location on a map.

---

## Main features

- **Hotel List:** View a list of hotels with basic information such as name, price, stars, and rating.
- **Hotel Details:** Explore detailed information about a hotel, including an image gallery and a map with the location.
- **Filtering:** Filter hotels by price, stars, or rating.
- **Image Management:** Validate images before displaying them and replace invalid ones with a `placeholder`.
- **Integrated Map:** Display the hotel's location using **react-native-maps**.

---

## Installation

Follow these steps to run the project locally:

### Prerequisites

- Yarn or npm
- Expo CLI (optional for faster development)
- An Android/iOS emulator or a physical device

### Passos

1. **Clone the repository**

   ```bash
   git clone https://github.com/username/HotelApp.git
   cd HotelApp
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Application**

   ```bash
   npm start
   ```

- **For iOS**:

  ```bash
  npm run ios
  ```

- **For Android**:
  ```bash
  npm run android
  ```

---

## Project structure

```
src/
├── components/         # Reusable components (ValidatedImage, FilterButton, etc.)
├── contexts/           # Context API for global state management (HeaderContext)
├── navigation/         # Navigation configuration (AppNavigator.tsx)
├── screens/            # Main screens (HotelListScreen, HotelDetailsScreen)
├── services/           # API services (fetchHotels)
├── styles/             # Styling files (colors.ts)
├── types/              # Type and enum definitions
├── utils/              # Helper functions (validateImageUrl)
└── tests/              # Unit and integration tests
```

## Technologies Used

- **React Native**: Main framework for mobile development.
- **TypeScript**: For robust, statically-typed code.
- **React Navigation**: For managing navigation within the application.
- **React Native Maps**: To display hotel locations on a map.
- **Jest** and **React Testing Library**: For unit and integration testing.

## Testing

To run the tests, use the following command:

```bash
npm test
```

---

## TODO and Future Improvements

- **Enable multi-filter selection**: Allow users to select more than one filter with priority for better results management.
- **Implement hotel name search**: To quickly and efficiently find specific hotels.
- **Add favorite hotels functionality**: Enable saving and easy access to preferred hotels.
- **Optimize performance for large hotel lists**: Reduce loading times and improve user experience.

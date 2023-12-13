# Sunbase Data API Integration
This repository contains the implementation of a project that successfully integrates with Sunbase Data's APIs. The APIs provided include user authentication, customer creation, retrieval of customer lists, deletion of customers, and updating customer information.

https://github.com/jangir02vishal/Sunbase-Data-Assignment/assets/136950731/3e931fbe-8e76-48f9-a531-27fd3bbba8df

## Implementation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/jangir02vishal/Sunbase-Data-Assignment.git
   ```

2. **Navigate to Project Directory:**

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Run the Server:**
   ```bash
   node server.js
   ```

5. **Run the Application:**
   Open `index.html` in a web browser or host the project using a local server.

6. **Test the API Integration:**
   Use the implemented features to test user authentication, customer creation, retrieval, deletion, and updating.

## Setting up `cors-anywhere`

During development, you may encounter CORS issues. To address this, a local server using `cors-anywhere` can be set up.

1. **Install `cors-anywhere`:**
   ```bash
   npm install cors-anywhere
   ```

2. **Run `cors-anywhere`:**
   ```bash
   node server.js
   ```

   This server will run on `http://localhost:8080` by default.

3. **Update API Endpoint URLs:**
   Update your API endpoint URLs in the application to use `http://localhost:8080` as a proxy.

### Login screen - ###
![Login Screen](https://github.com/jangir02vishal/Sunbase-Data-Assignment/assets/136950731/647e38bf-0049-43f9-824e-cb61b14b27f3)

### Customer List screen - ###
![Customer List Screen](https://github.com/jangir02vishal/Sunbase-Data-Assignment/assets/136950731/b2c99e24-2132-4e5c-913d-5a5f3c7dc110)

### Add a new customer screen - ###
![Add a new customer screen](https://github.com/jangir02vishal/Sunbase-Data-Assignment/assets/136950731/ae3f906f-2c60-4cfb-8d7b-b2cc9ca194cb)

### Edit customer details screen - ###
![Edit customer details screen](https://github.com/jangir02vishal/Sunbase-Data-Assignment/assets/136950731/a30f0e03-4c08-4686-9dc6-c948ae8f6d28)

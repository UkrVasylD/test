## How start ?
    1. We use Jest for test. Check out the official docs: https://jestjs.io/docs/getting-started.
    2. Install docker and docker-compose
        - sudo apt install docker
        - sudo apt install docker-compose
        - sudo apt-get install docker-compose-plugin
        - sudo usermod -aG docker ${USER}
    3. npm run test

## Command
Start all test - **npm run test**
Start integration test - **npm run test:integration**
Start component test - **npm run test:component**
Start unit test - **npm run test:unit**

## Path:
- UNIT:
    tests should be created in a folder __tests__ and extension **.spec.js** !!! 
    The __tests__ directory must be located next to the  file for test.
- COMPONENT:
    tests should be created in a folder **tests/component** and extension **.test.js**.
- INTEGRATION:
    tests should be created in a folder **tests/integration** and extension **.test.js**.
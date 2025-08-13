import { jest } from '@jest/globals';
import authController from '../controllers/AuthController.js'; // Assuming your file is named authController.js

// Mock the external modules and database connection
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

// Mock the database connection module
const mockQuery = jest.fn();
jest.mock('../models/db_connection.js', () => ({
  query: mockQuery,
}));

// Mock the response object
const mockResponse = () => {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  return res;
};

// Mock Date.now() to ensure a consistent userid for testing
const mockDate = Date.now;
beforeAll(() => {
  global.Date.now = jest.fn(() => 1672531199000); // A fixed timestamp
});

afterAll(() => {
  global.Date.now = mockDate;
});

describe('User Authentication Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {};
    res = mockResponse();
    // Clear mocks before each test to ensure isolation
    mockQuery.mockClear();
    bcrypt.hash.mockClear();
    bcrypt.compare.mockClear();
    jsonwebtoken.sign.mockClear();
  });

  // --- Signup Tests ---
  describe('signup', () => {
    it('should successfully create a new user and return a 201 status', async () => {
      // Setup
      req.body = { username: 'testuser', upassword: 'password123' };
      bcrypt.hash.mockImplementation((password, saltRounds, callback) => callback(null, 'hashedPassword123'));
      mockQuery.mockImplementation((sql, values, callback) => callback(null, 'mockResult'));

      // Action
      await authController.signup(req, res);

      // Assertions
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10, expect.any(Function));
      expect(mockQuery).toHaveBeenCalledWith(
        expect.any(String),
        ['1672531199000', 'testuser', 'hashedPassword123'],
        expect.any(Function)
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith('mockResult');
    });

    it('should return a 500 status if a database error occurs during user creation', async () => {
      // Setup
      req.body = { username: 'testuser', upassword: 'password123' };
      const dbError = new Error('Database connection failed');
      bcrypt.hash.mockImplementation((password, saltRounds, callback) => callback(null, 'hashedPassword123'));
      mockQuery.mockImplementation((sql, values, callback) => callback(dbError, null));

      // Action
      await authController.signup(req, res);

      // Assertions
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(dbError);
    });
  });

  // --- Signin Tests ---
  describe('signin', () => {
    it('should successfully sign in a user and return a token with 200 status', async () => {
      // Setup
      req.body = { username: 'testuser', upassword: 'password123' };
      const userRecord = [{ id: 1, username: 'testuser', password: 'hashedPassword123' }];
      mockQuery.mockImplementation((sql, values, callback) => callback(null, userRecord));
      bcrypt.compare.mockImplementation((upassword, hash, callback) => callback(null, true));
      jsonwebtoken.sign.mockReturnValue('mockJwtToken');

      // Action
      await authController.signin(req, res);

      // Assertions
      expect(mockQuery).toHaveBeenCalledWith(expect.any(String), ['testuser'], expect.any(Function));
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword123', expect.any(Function));
      expect(jsonwebtoken.sign).toHaveBeenCalledWith(
        { userid: 1, username: 'testuser' },
        'todo-app-user-secret-key',
        { expiresIn: '1h' }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ token: 'mockJwtToken' });
    });

    it('should return a 404 status if the user is not found', async () => {
      // Setup
      req.body = { username: 'nonexistentuser', upassword: 'password123' };
      mockQuery.mockImplementation((sql, values, callback) => callback(null, [])); // Empty result

      // Action
      await authController.signin(req, res);

      // Assertions
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith('User not found');
    });

    it('should return a 401 status for an incorrect password', async () => {
      // Setup
      req.body = { username: 'testuser', upassword: 'wrongpassword' };
      const userRecord = [{ id: 1, username: 'testuser', password: 'hashedPassword123' }];
      mockQuery.mockImplementation((sql, values, callback) => callback(null, userRecord));
      bcrypt.compare.mockImplementation((upassword, hash, callback) => callback(null, false)); // Password comparison fails

      // Action
      await authController.signin(req, res);

      // Assertions
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith('Wrong password');
    });

    it('should return a 500 status if a database error occurs during signin query', async () => {
      // Setup
      req.body = { username: 'testuser', upassword: 'password123' };
      const dbError = new Error('Signin DB error');
      mockQuery.mockImplementation((sql, values, callback) => callback(dbError, null));

      // Action
      await authController.signin(req, res);

      // Assertions
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(dbError);
    });
  });
});

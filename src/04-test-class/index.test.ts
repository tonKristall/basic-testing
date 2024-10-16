import { BankAccount, getBankAccount } from '.';
import { random } from 'lodash';

jest.mock('lodash');

describe('BankAccount', () => {
  let account: BankAccount;

  beforeEach(() => {
    account = getBankAccount(100);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    const balance = account.getBalance();
    expect(balance).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(200)).toThrowError(
      'Insufficient funds: cannot withdraw more than 100',
    );
  });

  test('should throw error when transferring more than balance', () => {
    const accountDestination = getBankAccount(20);
    expect(() => account.transfer(200, accountDestination)).toThrowError(
      'Insufficient funds: cannot withdraw more than 100',
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(100, account)).toThrowError(
      'Transfer failed',
    );
  });

  test('should deposit money', () => {
    account.deposit(50);
    const balance = account.getBalance();
    expect(balance).toBe(150);
  });

  test('should withdraw money', () => {
    account.withdraw(50);
    const balance = account.getBalance();
    expect(balance).toBe(50);
  });

  test('should transfer money', () => {
    const accountDestination = getBankAccount(20);
    account.transfer(50, accountDestination);
    const balanceSource = account.getBalance();
    const balanceDestination = accountDestination.getBalance();
    expect(balanceSource).toBe(50);
    expect(balanceDestination).toBe(70);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    (random as jest.Mock).mockReturnValueOnce(100);
    (random as jest.Mock).mockReturnValueOnce(1);
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    (random as jest.Mock).mockReturnValueOnce(100);
    (random as jest.Mock).mockReturnValueOnce(1);
    await account.synchronizeBalance();
    const balance = account.getBalance();
    expect(balance).toBe(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    (random as jest.Mock).mockReturnValueOnce(100);
    (random as jest.Mock).mockReturnValueOnce(0);
    await expect(account.synchronizeBalance()).rejects.toThrowError(
      'Synchronization failed',
    );
  });
});

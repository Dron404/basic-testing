jest.mock('lodash', () => {
  return {
    random: jest.fn().mockReturnValue(1),
  };
});
import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(5);
    expect(account.getBalance()).toBe(5);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 5;
    const account = getBankAccount(balance);
    expect(() => account.withdraw(10)).toThrowError(
      new InsufficientFundsError(balance),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const balance = 5;
    const accountA = getBankAccount(balance);
    const accountB = getBankAccount(balance + balance);

    expect(() => accountA.transfer(10, accountB)).toThrowError(
      new InsufficientFundsError(balance),
    );
  });

  test('should throw error when transferring to the same account', () => {
    const balance = 5;
    const account = getBankAccount(balance);
    expect(() => account.transfer(3, account)).toThrowError(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    const balance = 5;
    const account = getBankAccount(balance);
    account.deposit(balance);
    expect(account.getBalance()).toBe(balance * 2);
  });

  test('should withdraw money', () => {
    const accountA = getBankAccount(10000);
    accountA.withdraw(1);
    expect(accountA.getBalance()).toBe(9999);
  });

  test('should transfer money', () => {
    const balance = 5;
    const accountA = getBankAccount(balance);
    const accountB = getBankAccount(balance + balance);
    accountA.transfer(balance, accountB);

    expect(accountA.getBalance()).toBe(0);
    expect(accountB.getBalance()).toBe(balance * 3);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = 5;
    const accountA = getBankAccount(balance);
    expect(typeof (await accountA.fetchBalance())).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 10005000;
    const accountA = getBankAccount(balance);
    accountA.synchronizeBalance();
    expect(accountA.getBalance).not.toBe(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const balance = 10005000;
    const accountA = getBankAccount(balance);
    accountA.synchronizeBalance();
    expect(accountA.getBalance).not.toBe(balance);
    jest.spyOn(accountA, 'fetchBalance').mockResolvedValue(null);
    await expect(accountA.synchronizeBalance()).rejects.toThrow(
      new SynchronizationFailedError(),
    );
  });
});

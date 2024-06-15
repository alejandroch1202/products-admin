import { connect } from '../src/app'
import db from '../src/config/db'

jest.mock('../src/config/db')

describe('database connection', () => {
  it('should handle database connection error', async () => {
    jest
      .spyOn(db, 'authenticate')
      .mockRejectedValueOnce(
        new Error('[db] There was an error trying to connect to PostgreSQL')
      )
    const consoleSpy = jest.spyOn(console, 'log')

    await connect()

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        '[db] There was an error trying to connect to PostgreSQL'
      )
    )
  })
})

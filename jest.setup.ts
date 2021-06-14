global.mockFetch = response => () => ({
  __esModule: true,
  ...jest.requireActual("cross-fetch"),
  default: jest.fn(() =>
    Promise.resolve({
      ok: true,
      headers: { get: () => "application/json" },
      json: () => Promise.resolve({ data: response })
    })
  )
});

const { smoothScroll } = require("./utils");

test("memanggil scrollIntoView", () => {
  const target = {
    scrollIntoView: jest.fn(),
  };

  smoothScroll(target);

  expect(target.scrollIntoView).toHaveBeenCalled();
});
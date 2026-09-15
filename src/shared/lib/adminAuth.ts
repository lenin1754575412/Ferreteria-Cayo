export function validAdminKey(
  request: Request
) {
  const expected =
    process.env.ADMIN_KEY;

  const received =
    request.headers.get(
      "x-admin-key"
    );

  return Boolean(
    expected &&
    received &&
    expected === received
  );
}
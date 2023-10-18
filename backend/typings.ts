/* eslint-disable */
export type Schema = {
  'sessions': {
    plain: {
      'expiredAt': number;
      'id': string;
      'destroyedAt': string;
      'json': string;
    };
    nested: {};
    flat: {};
  };
  'user': {
    plain: {
      'id': number;
      'name': string;
      'is_admin': number;
      'created_at': string;
      'updated_at': string;
    };
    nested: {};
    flat: {};
  };
};

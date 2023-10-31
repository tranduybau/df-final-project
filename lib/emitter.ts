import mitt from 'mitt';

type Events = {
  FORCE_LOGOUT: void
};

// eslint-disable-next-line import/prefer-default-export
export const emitter = mitt<Events>(); // inferred as Emitter<Events>

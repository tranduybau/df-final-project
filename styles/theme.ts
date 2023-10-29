import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '../tailwind.config';

const tailwind = resolveConfig(tailwindConfig);

export default tailwind;

// https://stackoverflow.com/questions/61118060/how-to-access-tailwind-colors-from-javascript

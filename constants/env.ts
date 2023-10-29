interface ENVType {
  NODE_ENV: String
}

const ENV: ENVType = {
  NODE_ENV: process.env.NODE_ENV,
};

export default ENV;

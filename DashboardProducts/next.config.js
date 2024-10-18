module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/products',
        permanent: false,
      },

    ];
  },
  images: {
    domains: ['fakestoreapi.com'],
  },
};

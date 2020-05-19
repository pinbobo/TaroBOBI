module.exports = {
  env: {
    NODE_ENV: '"development"',
    url: '"http://localhost:8082/api"',
    // url: '"https://bobi-miniapp.pinbobo.net/api"'
  },
  defineConstants: {
  },
  mini: {},
  h5: {
    devServer: {
      host: 'localhost',
      port: 8082,
      proxy: {
        '/api': {
          target: 'http://api.bobi-miniapp.pinbobo.net',
          changeOrigin: true
        }
      }
    }
  }
}

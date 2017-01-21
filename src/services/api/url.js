let url = ''
if (process.env.NODE_ENV === 'development') {
  url = '/api'
} else {
  url = 'http://localhost:4000'
}

export default url
